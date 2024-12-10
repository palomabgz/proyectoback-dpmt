import compression from "compression";
import zlib from "zlib";

export const brotliMiddleware = compression({
    filter: (req, res) => {
        if (req.headers["x-no-compression"]) {
          return false;
        }
        return compression.filter(req, res);
      },
      threshold: 1024,
      brotli: {
        enabled: true,
        params: {
          [zlib.constants.BROTLI_PARAM_QUALITY]: 11,
        },
      },
});