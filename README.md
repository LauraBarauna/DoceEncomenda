# Doce Encomenda 🍰

Doce Encomenda é uma plataforma de encomenda de doces onde os clientes podem montar seus pedidos personalizados, enquanto administradores atribuem preços e gerenciam o status dos pedidos. O sistema permite que os usuários acompanhem o andamento de suas encomendas e oferece um processo eficiente de gestão de pedidos para administradores.

## Funcionalidades ✨

- **Cadastro de Usuários**: Os usuários podem se cadastrar no sistema.
- **Criação de Endereços**: 
  - O cliente pode criar até 3 endereços de entrega em seu perfil.
  - Ao montar o pedido, o cliente escolhe qual dos 3 endereços será utilizado para a entrega.
- **Montagem de Pedidos**: Os clientes montam seus pedidos inserindo o tipo do doce, a quantidade desejada e outros detalhes específicos (como observações para personalização).
- **Gestão de Preços**: Administradores podem definir os preços dos itens de doce e ajustar conforme necessário.
- **Controle de Status**: Os administradores podem atualizar o status dos pedidos à medida que o processo avança.
- **Acompanhamento de Pedidos**: Clientes podem acompanhar o andamento de seus pedidos dentro do sistema.

## Tecnologias Utilizadas 💻

- **Backend**: JavaScript Node.js (Express.js) e MySQL 
- **API**: RESTful API para comunicação entre frontend e backend
- **Banco de Dados**: MySql

## Como Rodar o Projeto 🚀

### Pré-requisitos

- Node.js instalado
- MySQL configurado (dependendo de sua escolha de banco de dados)

### Rodando o Backend

1. Clone este repositório
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Inicie o Servidor
   ```bash
   npm install
   ```
4. Acesse o backend na URL: http://localhost:3000

## Como Usar
1. Faça o cadastro de um novo usuário ou faça login caso já tenha uma conta.
2. Crie até 3 endereços de entrega no perfil.
3. Comece a montar o seu pedido, escolhendo os doces e inserindo detalhes específicos.
4. Escolha para qual dos 3 endereços o seu pedido será enviado.
5. Aguarde a confirmação do administrador sobre o status do seu pedido
