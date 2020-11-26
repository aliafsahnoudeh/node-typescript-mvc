import express from 'express';
import IRestServer from './IRestServer';
import bodyParser from 'body-parser';
// import ValidationError from '../api/validators/ValidationError';
import ISampleRoutes from 'api/routes/ISampleRoutes';

class RestServer implements IRestServer {
    private port;
    private app;
    private host;
    private sampleRoutes;

    constructor(port: number, host: string, sampleRoutes: ISampleRoutes) {
      this.app = express();
      this.port = port;
      this.host = host;
      this.sampleRoutes = sampleRoutes;
      this.initBodyParser();
      // this.registerValidationError();
      this.add_Access_Control_Allow_Headers();
      this.registerRoutes();
    }

    public start(): void {
        try {
            this.app.listen(this.port, this.host);
            console.log(`RESTful API server started on: ${this.host}:${this.port}`);
          } catch (error) {
            console.error(error);
          }
    }

    private initBodyParser(): void {
      this.app.use(
        bodyParser.urlencoded({
          extended: true,
        })
      );
      this.app.use(bodyParser.json());
    }

    private add_Access_Control_Allow_Headers(): void {
      this.app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

        res.setHeader(
          'Access-Control-Allow-Methods',
          'GET, POST, OPTIONS, PUT, PATCH, DELETE'
        );

        res.setHeader(
          'Access-Control-Allow-Headers',
          'X-Requested-With,content-type,x-access-token,encType'
        );

        res.setHeader('Access-Control-Allow-Credentials', true);

        next();
      });
    }

    private registerRoutes(): void {
      this.sampleRoutes.registerApp(this.app);
      this.sampleRoutes.attach();
    }

    // private registerValidationError(): void {
    //   this.app.use((err: any, req: any, res: any, next: any): any => {
    //     if (res.headersSent) {
    //       return next(err);
    //     }

    //     if (err instanceof ValidationError) {
    //       return res.status(400).json({ error: err });
    //     }

    //     return res.status(err.status || 500).render('500');

    //   });
    // }
}

export default RestServer;
