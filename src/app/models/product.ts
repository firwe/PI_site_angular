export interface Product {
  id: string;
  nome: string;
  preco: string;
  precoAntigo?: string;
  descricao: string;
  imagem: string;
  categoria: string;
  section?: string;
}