import { user } from "../models/user";
import {} from "mocha";
import { userController } from "../core/user";
import { sha512 } from "js-sha512";
import { UserRepository } from "../db/user";
import { MongoClient } from "mongodb";


const chai = require("chai");
const assert = chai.assert;

describe('User operations', () => {
    it('test: create new user', (done) => {

        var userSubmit : user = new user("SKA","ska@ska.com.br","ska@6654");

        userController.saveUser(userSubmit, function(r) {
            assert.equal(r.message, "Sucesso!!!");
            assert.equal(r.res.name, userSubmit.name);
            assert.equal(r.res.email, userSubmit.email);
            assert.equal(r.res.password, sha512(userSubmit.password));
            done();
        }) 
        
    });
    

    it('test: auth user', () => {

        let  userSubmit : user = new user("SKA",undefined,"ska@6654");

        userController.authUser(userSubmit, function(r) {
  
        });
     
    });
 });
