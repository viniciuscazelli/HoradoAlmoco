import { systemOptionsController } from "../controller/systemOptionsController";


module.exports = function (app:any) { 

    app.post('/systemOptions/save', function (req, res) {
        systemOptionsController.saveSystemOptions(req,res);        
    });

    app.get('/systemOptions/get', function (req, res) {
        systemOptionsController.getSystemOptions(req,res);
    });

};