import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { usePost } from "../../context/PostContext";
import { IconCam } from "../../assets/Icons";
import ReactQuill from 'react-quill-new';
import "react-quill/dist/quill.snow.css";
import './write.css'

const categorias = ['art', 'videogames', 'tecnologies', 'cinema', 'food'];

export function Write() {

  // Configuracion de Quill
  const modules = {
    toolbar: [
      [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['bold', 'italic', 'underline', 'strong'],
      [{ 'align': [] }],
      [{ 'color': [] }],
      ['link'],
    ],
  };

  const formats = [
    'header', 'font', 'list', 'bold', 'italic', 'underline', 'strong', 'align', 'color', 'link'
  ];

  const { loading, isAuthenticated, user } = useAuth();

  const { addPost } = usePost();

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


 //Formulario
  const [errors, setErrors] = useState({});
  const [errorBackEnd, setErrorBackEnd] = useState({})

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

  // Maneja los cambios en el la descripcion
  const handleDescripChange = (value) => {
    setFormData({ ...formData, descrip: value });
    setErrors({ ...errors, descrip: '' });
  };

  // Maneja los cambios en el la foto
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFormData({ ...formData, file: selectedFile });
    setErrors({ ...errors, file: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = {};
    //Validacion de campos
    if (!formData.title) errors.title = 'El título es obligatorio';
    if (!formData.descrip) errors.descrip = 'La descripción es obligatoria';
    if (!formData.file) errors.file = 'Debe subir un archivo';
    if (!formData.file) {
      errors.file = 'Debes subir una foto de portada';
    } else if (formData.file instanceof File) {
      const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
      if (!allowedTypes.includes(formData.file.type)) {
        errors.file = 'Debes agregar una foto válida (JPEG, PNG, JPG)';
      }
    }
    if (!formData.cat) {
      errors.cat = 'Debe seleccionar una categoría';
    } else if (!categorias.includes(formData.cat)) {
      errors.cat = 'La categoría seleccionada no es válida';
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    const formSend = new FormData();
    formSend.append("title", formData.title);
    formSend.append("descrip", formData.descrip);
    formSend.append("cat", formData.cat);
    formSend.append("file", formData.file);

    try {
      await addPost(formSend);
      navigate('/');
    } catch (error) {
      if (Array.isArray(error)) {
        setErrorBackEnd({ general: '', backendErrors: error });
      } else {
        setErrorBackEnd({ general: error || "Subir el artículo, por favor inténtelo de nuevo" });
      }
    }
  }

  return (
    <form className="add" onSubmit={handleSubmit}>
      <h1>Escribe un artículo</h1>
      <div className="headerForm">
        <div className="photo">
          <IconCam />
          {formData.file ? (
            <img src={typeof formData.file === "string" ? `./img/${formData.file}` : URL.createObjectURL(formData.file)} alt="Foto de portada" />
          ) : null}
          <input type="file" name="file" accept="image/png, image/jpeg, image/jpg" onChange={handleFileChange} />
        </div>
        {errors.file && <div className="field-error">{errors.file}</div>}
        <div className="category">
          <label htmlFor="cat">Categoría:</label>
          <select name="cat" value={formData.cat} onChange={handleChange}>
            <option value="">Seleccionar categoría</option>
            {categorias.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          {errors.cat && <p className="field-error">{errors.cat}</p>}
        </div>
      </div>
      <div className="content">
        <div className="inputTitle inputRow">
          <label htmlFor="title">Título</label>
          <input type="text" placeholder="Título" name="title" id="title" value={formData.title} onChange={handleChange} />
        </div>
        {errors.title && <p className="field-error">{errors.title}</p>}
        <div className="editorContainer inputRow">
          <label htmlFor="descrip">Descripción</label>
          <ReactQuill
            modules={modules}
            formats={formats}
            className='editor'
            name='descrip'
            id="descrip"
            value={formData.descrip}
            onChange={handleDescripChange}
          />
        </div>
        {errors.descrip && <p className="field-error">{errors.descrip}</p>}
      </div>
      <button className="btnSubmit">Públicar</button>
      {/* Errores generales */}
      {errorBackEnd.general && <p className="field-error">{errorBackEnd.general}</p>}

      {/* Errores del backend (Zod, etc.) */}
      {errorBackEnd.backendErrors && (
        <ul>
          {errorBackEnd.backendErrors.map((err, index) => (
            <li className="field-error" key={index}>{err}</li>
          ))}
        </ul>
      )}
    </form>
  )
}
