import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";


@Injectable({
    providedIn: 'root'
})
export class AnagramService {

    constructor(private http: HttpClient) {
    }

    getAnagrams(word: string) {
        return this.http.get(environment.api.uri + "/anagram/")
    }



}
