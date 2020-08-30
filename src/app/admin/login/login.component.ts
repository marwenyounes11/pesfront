import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AdminService} from '../../components/service/admin.service';
import { Router } from '@angular/router';

import { DatePipe } from '@angular/common';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  query,
  animateChild,
  keyframes
} from '@angular/animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    
    trigger('easeInOut', [
      transition('void => *', [
          style({
              opacity: 0
          }),
          animate("500ms ease-in", style({
              opacity: 1
          }))
      ]),
      transition('* => void', [
          style({
              opacity: 1
          }),
          animate("500ms ease-in", style({
              opacity: 0
          }))
        ])
      ]),
      trigger('toggleanimation', [
        state('small', style({
          height: '0px'
        })),
        state('large', style({
          height: '100px'
        })),
        transition('small <=> large', animate('400ms ease-in' )),
      ]),
  ]
})
export class LoginComponent implements OnInit {
  state:string ='small';
  show1:boolean = false;
 hide :boolean = true;
  user: any={};
  loginname : String;
  password : String;
  errorMessage:string;  
  name : string;  
  Wdate;
  annee : 0;
  constructor(private router:Router,private userService : AdminService,
    public toastr: ToastrService,private datePipe : DatePipe) { }    
  ngOnInit() {    
     this.userService.islogin = false;
     this.userService.admin = false;
     this.userService.suser = false;
     this.Wdate = this.transformDate(new Date());
     this.annee = (this.Wdate).toString().substring(0,4);
     localStorage.setItem('annee', this.annee.toString());
  }    
  login() {
    
    this.userService.login(this.loginname).subscribe(
      response =>{this.user = response;
      
       if (this.user.pwd == this.password)
       {
        this.name = this.user.nom;
        localStorage.setItem('name', this.name);
         this.userService.islogin = true;
        if (this.user.role  == "Admin")
         {
          this.userService.admin = true;
        this.router.navigate(['/admin']);
     
     
      }
      else
      {
        
        this.router.navigate(['/login']);
        
      }
       }
              else
              {
                this.toastr.warning( 'Mot de Passe  Incorrecte ')
               }
          },
          error => 
          
            this.toastr.warning( 'Login Incorrecte ')
          );
      
    
    }
   

    transformDate(date){
      return this.datePipe.transform(date, 'yyyy-MM-dd');
    }
    logout() {
     
      localStorage.removeItem('name');
  }
  toggle1() {
    this.show1 = !this.show1;
  }
 
  
  animateMe(){
    this.state=(this.state==='small'?'large':'small');
  }


}
