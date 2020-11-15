import ISampleController from '../controllers/ISampleController';
import ISampleRoutes from './ISampleRoutes';

 class SampleRoutes implements ISampleRoutes {
   private _controller: ISampleController;
   private _app: any;

   constructor(app: any, controller: ISampleController) {
     this._controller = controller;
     this._app = app;
   }

   public attach(): void {
     this._app.route('/api/sample/:slug')
    .get(
      this._controller.getBySlug.bind(this._controller)
    );
   }
}

export default SampleRoutes;
