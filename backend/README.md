### Database Schema:

---

### Usuario  
Cada usuario tiene:  
- **ID**: único y autoincremental.  
- **Token**: generado aleatoriamente y único.  
- **Password**: encriptada con Argon2.  
- **Rol**: puede ser `USER`, `BANNED`, `ADMIN`, `MOD` o `HELPER`.  
- **Baneos**: información en formato JSON sobre baneos previos.  
- **Direcciones IP**: lista de IPs desde las que ha accedido.  
- **Fecha de Creación**: momento en que se creó la cuenta.  
- **Fecha de Actualización**: última modificación de la cuenta.  
- **Posts**: lista de publicaciones realizadas por el usuario.  
- **Comentarios**: lista de comentarios hechos por el usuario.  

---

### Publicación (Post)  
Cada post tiene:  
- **ID**: único y autoincremental.  
- **Token**: generado aleatoriamente y único.  
- **Autor**: usuario que creó el post.  
- **Imagen**: URL de la imagen asociada al post.  
- **Fecha de Creación**: momento en que se creó el post.  
- **Fecha de Actualización**: última modificación del post.  
- **Categorías**: lista de categorías a las que pertenece el post.  
- **Comentarios**: lista de comentarios en el post.  

---

### Comentario  
Cada comentario tiene:  
- **ID**: único y autoincremental.  
- **Token**: generado aleatoriamente y único.  
- **Imagen**: (opcional) URL de la imagen asociada al comentario.  
- **Es del Autor**: booleano que indica si el comentario es del creador del post.  
- **Autor**: usuario que hizo el comentario.  
- **Post**: publicación a la que pertenece el comentario.  
- **Fecha de Creación**: momento en que se creó el comentario.  
- **Fecha de Actualización**: última modificación del comentario.  

---

### Categoría  
Cada categoría tiene:  
- **ID**: único y autoincremental.  
- **Nombre**: nombre de la categoría.  
- **Posts**: lista de publicaciones dentro de esta categoría.  

---

### Roles de Usuario  
Los usuarios pueden tener uno de los siguientes roles:  
- **USER**: usuario normal.  
- **BANNED**: usuario baneado.  
- **ADMIN**: administrador con permisos completos.  
- **MOD**: moderador con permisos para gestionar contenido.  
- **HELPER**: usuario con permisos limitados de moderación.  

---
