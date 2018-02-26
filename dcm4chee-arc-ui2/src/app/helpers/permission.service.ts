import { Injectable } from '@angular/core';
import {j4care} from "./j4care.service";
import {Globalvar} from "../constants/globalvar";
import {J4careHttpService} from "./j4care-http.service";
import {AppService} from "../app.service";
import {Route, Router} from "@angular/router";

@Injectable()
export class PermissionService {

    constructor(private $http:J4careHttpService, private mainservice:AppService, private router: Router) { }
    uiConfig;

    getPermission(url){
      if(!this.uiConfig)
        return this.$http.get('../devicename')
            .map(res => j4care.redirectOnAuthResponse(res))
            .switchMap(res => this.$http.get('../devices/' + res.dicomDeviceName))
            .map(res => res.json())
            .map((res)=>{
                this.uiConfig = res.dcmDevice.dcmuiConfig["0"];
                return this.checkMenuTabAccess(url);
            });
      else{
          return this.checkMenuTabAccess(url);
      }
    }

    checkMenuTabAccess(url){
        let urlAtion = Globalvar.LINK_PERMISSION(url);
        let checkObject = this.uiConfig.dcmuiPermission.filter(element=>{
            return urlAtion && element.dcmuiAction === urlAtion.permissionsAction && element.dcmuiActionParam.indexOf('accessible') > -1;
        });
        if(checkObject && checkObject[0]){
          let check = false;
          checkObject[0].dcmAcceptedUserRole.forEach(role =>{
            if(this.mainservice.user.roles.indexOf(role) > -1)
              check = true;
          });
          if(check && checkObject[0].dcmuiActionParam.indexOf('accessible') > -1)
            return true;
          else
              if(urlAtion.nextCheck)
                  this.router.navigate([urlAtion.nextCheck]);
          return false;
        }
        return false;
    }

}
