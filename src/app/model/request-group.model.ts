import { Group } from "./group.model";
import { Profile } from "./profile.model";
import { Account } from "./account.model";

export interface RequestGroup {
  
  group?: Group;
    
  account?: Account;
  
  profile?: Profile;

}
