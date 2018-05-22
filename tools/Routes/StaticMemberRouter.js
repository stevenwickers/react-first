import express from 'express';
import {data} from '../../src/DataProvider/StaticData/MemberData'
import {AutoMap} from '../../src/GravyRepository/Helpers/ModelHelper';
import {MemberModel} from '../../src/GravyRepository/Controllers/Members/Models/MemberModel';


var routes = function(member){

    let staticMemberRouter = express.Router();

    staticMemberRouter.route('/members')

        //*** GET ALL Members
        .get(function(req, res){

            res.json(data);

        })

        //*** POST Members
        .post(function(req, res){


            debugger;

            let body = JSON.stringify(req.body);
            console.log('Member POST: ',body);

            let model = JSON.parse(body);
            let memberName = model[MemberModel.p_LastName.name];
            console.log(movieName);

            //Check if the Member Name already exists
            if(!data.find(x => x[MemberModel.p_LastName.name] == memberName)){

                console.log('POST Model: ', model);

                model[MemberModel.p_MemberID.name] = data.length + 1;

                data.push(model);

                res.send(model).status(200);


            } else {

                res.status(409).send('Duplicate Member Name!')

            }


        });



    staticMemberRouter.route('/members/:id')
        .get(function(req, res){

            console.log('Find Member by Id: ', req.params.id);

            let movie = data.filter(x => x[MemberModel.p_MemberID.name] == req.params.id);

            res.json(movie);

        })

        .put(function(req, res) {

            let body = JSON.stringify(req.body);
            let model = JSON.parse(body);

            //Find item by id passed in
            let index = data.findIndex(x => x[MemberModel.p_MemberID.name] == req.params.id);

            //Check if item found
            if(index !== -1){

                //Use Auto Map to update the existing record with new values passed in
                //***Note: any model properties with 'sealed:true' will not be updated only when model type is passed in

                data[index] = AutoMap(data[index], model, MemberModel);


                res.json(data[index]);

            } else {

                res.status(500).send('Record Not Found')

            }


        });

    return staticMemberRouter;
};

module.exports = routes;