import {Agenda} from "agenda"
import { MongoBackend } from '@agendajs/mongo-backend';

const agenda = new Agenda({
    backend: new MongoBackend({
        address: process.env.MONGO_URI as string,
    })
})

export default agenda;