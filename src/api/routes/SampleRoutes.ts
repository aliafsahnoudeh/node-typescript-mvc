import ILogger from 'services/ILogger';
import ISampleController from '../controllers/ISampleController';
import ISampleRoutes from './ISampleRoutes';

 class SampleRoutes implements ISampleRoutes {
   private readonly _controller: ISampleController;
   private _app: any;
   private readonly _logger: ILogger;

   constructor(controller: ISampleController, logger: ILogger) {
     this._controller = controller;
     this._logger = logger;
   }

   public registerApp(app: any): void {
    this._logger.info('registerApp');
    this._app = app;
   }

   public attach(): void {
    this._logger.info('attach SampleRoutes');
    this._app.route('/api/sample/:slug')
    .get(
      this._controller.getBySlug.bind(this._controller)
    );

    this._app.route('/api/sample')
    .get(
      this._controller.getAll.bind(this._controller)
    );

    this._app.route('/api/sample')
    .post(
      this._controller.create.bind(this._controller)
    );
   }
}

export default SampleRoutes;
