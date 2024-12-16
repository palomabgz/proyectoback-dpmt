import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import ReactQuill from 'react-quill-new';
import "react-quill/dist/quill.snow.css";
import './write.css'

export function Write() {

  const { loading, isAuthenticated, user } = useAuth();

  const navigate = useNavigate();

  // Redirecciona al login si el usuario no esta autenticado
  useEffect(() => {
    const storedUsername = localStorage.getItem('session_username');
    if (!storedUsername) {
      navigate('/');
    } else if (!loading && (!isAuthenticated || !user)) {
      navigate('/');
    }
  }, [loading, isAuthenticated, user, navigate]);

  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    title: '',
    descrip: '',
    cat: '',
    file: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value })
    setErrors({ ...errors, [name]: '' }); // Limpiar el error cuando el usuario comienza a escribir
  }

  const handleDescripChange = (value) => {
    setFormData({ ...formData, descrip: value });
    setErrors({ ...errors, [descrip]: ''});
  };

  // Maneja los cambios en el archivo
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFormData({ ...formData, file: selectedFile });
    setErrors({ ...errors, [file]: null});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

  }

  return (
    <form className="add" onSubmit={handleSubmit}>
      <h1>Escribe un artículo</h1>
      <div className="menu">
        <div className="photo">
          {formData.file ? (
            <img src={typeof formData.file === "string" ? `./img/${formData.file}` : URL.createObjectURL(formData.file)} alt="Foto de portada" />
          ) : null}
          <input type="file" accept="image/png, image/jpeg, image/jpg" onChange={handleFileChange} />
        </div>
        <div className="category">
          <label htmlFor="cat">Categoría:</label>
          <select name="cat" value={formData.cat} onChange={handleDescripChange}>
            <option value="ART">ART</option>
            <option value="Video Juegos">Video Juegos</option>
            <option value="Técnologias">Técnologías</option>
            <option value="Técnologias">Cine</option>
            <option value="Técnologias">Comida</option>
          </select>
        </div>
      </div>
      <div className="content">
        <input type="text" placeholder="Título" value={formData.title} onChange={handleChange} />
        <div className="editorContainer">
          <ReactQuill
            className='editor'
            name='descripción'
            value={formData.descrip}
            onChange={handleDescripChange}
          />
        </div>
      </div>
      <button>Públicar</button>
    </form>
  )
}
