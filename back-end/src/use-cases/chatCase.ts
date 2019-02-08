import { user } from "../models/user";
import { messageReturn } from "../models/messageReturn";
import { Group } from "../models/Chat";

export module chatCase {

    export function getGroupsByUser(user : user):Promise<messageReturn<Group[]>> {
        return new Promise<messageReturn<Group[]>>(resolve =>{

        })
    }

    export function createGroups(group : Group):Promise<messageReturn<Group>> {
        return new Promise<messageReturn<Group>>(resolve =>{

        })
    }

    export function removeUserGroup(user: user,group : Group):Promise<messageReturn<Group>> {
        return new Promise<messageReturn<Group>>(resolve =>{

        })
    }

    export function addUserInGroup(user: user,group : Group):Promise<messageReturn<Group>> {
        return new Promise<messageReturn<Group>>(resolve =>{

        })
    }

    export function renameGroup(user: user,group : Group):Promise<messageReturn<Group>> {
        return new Promise<messageReturn<Group>>(resolve =>{

        })
    }

    export function checkUserIsAdmin(user: user,group : Group):Promise<boolean> {
        return new Promise<boolean>(resolve =>{

        })
    }
}