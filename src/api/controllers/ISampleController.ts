interface ISampleController {
    getAll: (req: any, res: any) => void;
    getBySlug: (req: any, res: any) => void;
    create: (req: any, res: any) => void;
}

export default ISampleController;
