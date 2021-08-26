import { Component, OnInit } from '@angular/core';
import {AfterViewInit, ElementRef, ViewChild} from '@angular/core';
import { GetUserDataService } from '../get-user-data.service';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  constructor(private userData: GetUserDataService, private http: HttpClient) { }

  fileToUpload: File | null = null;
  username  : string = "";
  imageSrc : string = "";

  ngOnInit(): void {
    this.userData.getUserData().subscribe((data) => {
      const stringifiedData = JSON.stringify(data);
      const parsedJson = JSON.parse(stringifiedData);
      this.imageSrc = parsedJson.data.about_me.avatar_url;
      this.username = `${parsedJson.data.about_me.first_name} ${parsedJson.data.about_me.last_name}`;
    });
  }


  handleFileInput(target: EventTarget){
    this.fileToUpload = (target as HTMLInputElement).files.item(0);
  }

  changeImage(): void{

    const httpOptions = {
      headers: new HttpHeaders({'Authorization': `Bearer ${localStorage.getItem('token')}`, 'security-token': 'test'})
    };

    const formData: FormData = new FormData();
    formData.append('file', this.fileToUpload);
    formData.append('type', 'avatar')
    formData.append('id', `${localStorage.getItem("idUser")}`)
    const updateUrl = `http://meetprep.beta.bitstone.eu/api/v1/user/${localStorage.getItem("idUser")}`;

    let urlAvatar = "";
    this.userData.changeUserAvatar(formData).subscribe((data) => {
      const stringifiedData = JSON.stringify(data);
      const parsedJson = JSON.parse(stringifiedData);
      urlAvatar = parsedJson.data.url;

      this.http.put(updateUrl, {"avatar_url": urlAvatar} , httpOptions).subscribe((data) =>{
          console.log(data);
          window.location.reload();
      });
    });

  }

}
