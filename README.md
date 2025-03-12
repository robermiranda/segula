# SEGULA TECHNOLOGIES RESTFULL API

El código alojado en éste repositorio corresponde a la prueba técnica
para el proceso de trabajo en **Segula Technologies**.

Se trata de una **API REST** para la gestión de empleados así como sus horas
laborales.

El proyecto esta desplegado en la nube *Render* y la documentación puede ser
consultada siguiendo el link: [segula api](https://segula.onrender.com/api)

## DESARROLLO

Al inicio se había planteado usar *express.js* como tecnología base para
desarrollar la *API*; esta consideración esta sustentada por el hecho de
que el desarrollador **Roberto Miranda** cuenta con amplia experiencia en
este framework, sin embargo entre los requisitos para el puesto en
*Segula Technologies* se menciona tener conocimientos en *nestjs*, entonces
me tomé el tiempo para entender las ventajas que ofrece *nestjs* en
comparación con *expressjs* y entendí de inmediato que son muchas las ventajas,
pués *nestjs* ya tiene integradas las siguientes tecnologías:

- typescript
- typeorm
- swagger

Tecnologías requeridas en ésta prueba técnica. Por esta razón decidí aprender
*nestjs* y usarlo como tecnología base.

## ARQUITECTURA

La arquitectura de la prueba técnica quedá determinada por lo que es, una
**API REST** sobre el protocolo **HTTP** que por construcción es **stateless**

Los componentes de la *API* quedan determinados por el Framework elegido *nestjs*:

![arquitectura](./img/arquitectura.png)

- Modules - encapsula los controllers y services en una sola unidad lógica
- Controllers - recibe las peticiones http
- Services - uso de typeorm para conectarse a la base de datos
- Guards - realiza validaciones a las peticiones de entrada

Se aplica el paradigma de programación *OOP* en todo el proyecto y para la
inyección de dependencias se usa la técnica *Inversion Of Control* pero
de esto se encarga el framework de tal manera que el desarrollador no necesita
hacer escribir código para la *IoC*.

## BASE DE DATOS

Hay dos tipos de bases de datos a usar, las del tipo *SQL* y las que son *NoSQL*. Yo
he elegido *postgresql* que es de tipo *SQL*.

En la descripción del proyecto quedan claras dos entidades:

- Empleado
- Horas Trabajadas

Claramente para una instancia de *Empleado* le corresponden varias instancias de la
entidad *Horas Trabajadas*.

El enunciado anterior sugiere un modelo *Entidad - Relación* por lo que debemos
usar un manejador de tipo relacional *SQL*. Hemos elegido *postgres* la cual está
montada en la nube *supabase*.

![esquema db](./img/db-schema.png)

La Tabla *Empleado* tiene dos campos:

- id: primary key
- nombre: el nombre del empleado

Siendo irrelevante agragar más campos.

La tabla *Horas_Trabajo* tiene varios campos:

- id: primary key
- empleadoId: foreign key hacia la propiedad id de la tabla *Empleado*
- fecha: la fecha de un día de trabajo
- hora_entrada: la hora en que el empleado se presento a trabajar
- hora_salida: la hora en que el empleado salio de trabajar

A la tabla *horas_trabjo* se le agrego la siguiente restricción:

```bash
alter table horas_trabajo
add constraint unique_horas_trabajo
unique ("empleadoId", "fecha")
```
para evitar que en la tabla se agreguen mas de un registro de
un *empleado* con la misma *fecha*. Es decir se evita la duplicidad
en la tabla de *fecha* para el mismo *empleado*

A la base de datos también se le delega la eliminación de los
registros en la tabla *horas_trabajo* cuando se elimina un registro
de la tabla *empleado*: Esto se logra estableciendo la restricción
*ON DELETE CASCADE* a la llave foranea *empleadoId* en la tabla
*horas_trabajo*


## PROJECT SETUP

```bash
$ npm install
```

## EJECURAR Y COMPILAR

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## CONTACTO

- Author - [Roberto Miranda Morales](https://romix-dev.netlify.app/)
- mail - rob.mirandam@gmail.com
