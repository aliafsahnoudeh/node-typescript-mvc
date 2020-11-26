import ISampleController from '../controllers/ISampleController';
import ISampleRoutes from './ISampleRoutes';

 class SampleRoutes implements ISampleRoutes {
   private _controller: ISampleController;
   private _app: any;

   constructor(controller: ISampleController) {
     this._controller = controller;
   }

   public registerApp(app: any): void {
    this._app = app;
   }

   public attach(): void {
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
