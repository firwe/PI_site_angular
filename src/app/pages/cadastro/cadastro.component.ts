import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [ CommonModule, FormsModule, RouterLink ],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent {

  signupData = {
    email: '',
    nascimento: '',
    nome: '',
    sobrenome: '',
    senha: '',
    confirmarSenha: ''
  };

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit() {
    if (this.signupData.senha !== this.signupData.confirmarSenha) {
      alert('Erro: As senhas não conferem!');
      return;
    }

    const newUser: User = {
      email: this.signupData.email,
      nascimento: this.signupData.nascimento,
      nome: this.signupData.nome,
      sobrenome: this.signupData.sobrenome,
      senha: this.signupData.senha
    };

    const success = this.authService.register(newUser);

    if (success) {
      this.router.navigate(['/login']);
    }
  }
}