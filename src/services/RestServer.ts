import express from 'express';
import IRestServer from './IRestServer';
import bodyParser from 'body-parser';
// import ValidationError from '../api/validators/ValidationError';
import ISampleRoutes from 'api/routes/ISampleRoutes';
import ILogger from './ILogger';

class RestServer implements IRestServer {
    private readonly port: number;
    private readonly app: any;
    private readonly host: string;
    private readonly sampleRoutes: ISampleRoutes;
    private readonly _logger: ILogger;

    constructor(port: number, host: string, sampleRoutes: ISampleRoutes, logger: ILogger) {
      this.app = express();
      this.port = port;
      this.host = host;
      this.sampleRoutes = sampleRoutes;
      this._logger = logger;

      this.initBodyParser();
      // this.registerValidationError();
      this.add_Access_Control_Allow_Headers();
      this.registerRoutes();
    }

    public start(): void {
        try {
            this.app.listen(this.port, this.host);
            this._logger.info(`RESTful API server started on: ${this.host}:${this.port}`);
          } catch (error) {
            this._logger.error(error);
          }
    }

    private initBodyParser(): void {
      try {
        this._logger.info('initBodyParser');
        this.app.use(
          bodyParser.urlencoded({
            extended: true,
          })
        );
        this.app.use(bodyParser.json());
      } catch (error) {
        this._logger.error(error);
      }
    }

    private add_Access_Control_Allow_Headers(): void {
      this._logger.info('add_Access_Control_Allow_Headers');
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
      try {
        this._logger.info('registering routes');
        this.sampleRoutes.registerApp(this.app);
        this.sampleRoutes.attach();
      } catch (error) {
        this._logger.error(error);
      }
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
