# Sistema de Alumnos

Descripción
Sistema básico de gestión de alumnos con dos tipos de usuarios: Admin y Estudiante.

Usuario Admin: Puede realizar todas las operaciones CRUD sobre Materias, Notas, Alumnos y Usuarios.
Usuario Estudiante: Solo puede iniciar sesión y consultar sus notas.


Tecnologías Utilizadas

-Backend:

Node.js y Express.js: Para la gestión de rutas y el servidor.

Sequelize: ORM para interactuar con la base de datos MySQL.

JWT (JsonWebToken): Para generar y verificar tokens de autenticación.

bcryptjs: Para el hash de contraseñas al crear y autenticar usuarios.

cookie-parser: Para gestionar cookies en las peticiones.

method-override: Para manejar métodos HTTP PUT y PATCH.


-Frontend:

Pug: Plantillas para renderizar vistas dinámicas.
CSS y Bootstrap: Estilos para el diseño y la interfaz de usuario.


-Base de Datos:

MySQL: Sistema de gestión de bases de datos.
Base de datos: sistemalu.sql


-Rutas y Funcionalidades

Usuario Admin:
El Admin puede realizar las siguientes acciones CRUD:

Materia: Crear, Leer, Actualizar, Eliminar materias.

Nota: Crear, Leer, Actualizar, Eliminar notas.

Alumno: Crear, Leer, Actualizar, Eliminar alumnos.

Usuario: Crear, Leer, Actualizar, Eliminar usuarios.

Usuario Estudiante:

El Estudiante puede realizar solo las siguientes acciones:

Consultar sus notas: Una vez autenticado, el estudiante puede ver sus notas(si es que tiene una cuenta de usaurio).

-Autenticación y Autorización

Inicio de sesión: El usuario ingresa su correo y contraseña. La contraseña es verificada usando bcryptjs.

Generación de Token: Después de iniciar sesión con éxito, se genera un token JWT que contiene la información del usuario.

Almacenamiento del Token: El token se guarda en una cookie usando cookie-parser para mantener la sesión del usuario.

Verificación de Token: Se implementa una función verifyToken en el middleware para asegurarse de que el usuario esté autenticado en rutas protegidas.

Verificación de Rol: La función verifyRole se utiliza para asegurarse de que el usuario tenga los permisos necesarios para acceder a ciertas rutas (por ejemplo, solo el admin puede acceder a rutas de gestión de usuarios).

ADVERTENCIA!!

siempre el estudiante debe estar inscripto como alumno antes de pedir una cuenta de usuario.