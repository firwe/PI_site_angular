import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private adminUser = {
    email: 'admin@admin.com',
    senha: 'admin123',
    nome: 'Administrador'
  };

  private users: User[] = [];

  constructor() { }

  isLoggedIn(): boolean {
    return sessionStorage.getItem('isLoggedIn') === 'true';
  }

  isAdmin(): boolean {
    return sessionStorage.getItem('isAdmin') === 'true';
  }

  getCurrentUserName(): string | null {
    return sessionStorage.getItem('loggedInUserName');
  }

  logout() {
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('isAdmin');
    sessionStorage.removeItem('loggedInUserName');
    alert('Você foi desconectado.');
  }

  register(user: User): boolean {
    if (user.email === this.adminUser.email) {
      alert('Erro: Este e-mail é reservado para o administrador.');
      return false;
    }
    const userExists = this.users.find(u => u.email === user.email);
    if (userExists) {
      alert('Erro: Este e-mail já está cadastrado.');
      return false;
    }
    this.users.push(user);
    alert('Usuário cadastrado com sucesso!');
    console.log('LISTA DE USUÁRIOS ATUAL:', this.users);
    return true;
  }

  login(email: string, senha: string): boolean {
    
    if (email === this.adminUser.email && senha === this.adminUser.senha) {
      sessionStorage.setItem('isLoggedIn', 'true');
      sessionStorage.setItem('isAdmin', 'true');
      sessionStorage.setItem('loggedInUserName', this.adminUser.nome); 
      alert('Login de Administrador realizado com sucesso!');
      return true;
    }

    const user = this.users.find(u => u.email === email && u.senha === senha);
    if (user) {
      sessionStorage.setItem('isLoggedIn', 'true');
      sessionStorage.setItem('isAdmin', 'false');
      sessionStorage.setItem('loggedInUserName', user.nome);
      alert('Login realizado com sucesso! Bem-vindo(a), ' + user.nome);
      return true;
    }

    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('isAdmin');
    sessionStorage.removeItem('loggedInUserName');
    alert('Erro: E-mail ou senha inválidos.');
    return false;
  }
}