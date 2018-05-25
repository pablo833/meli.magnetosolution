# meli.magnetosolution

# Storage

1. El sistema de almacenamiento esta implementado utilizando ElasticSearch, para lo cual se necesita tener una instancia corriendo. Para esto se puede utilizar cualquier instancia existente, ya sea on-premise o en la nube, o descargar la versión desktop desde el sitio web (https://www.elastic.co/downloads/elasticsearch) y seguir las instrucciones para su ejecucón en función de sistema operativo correspondiente. 

2. Crear los Indices de Personas y Stats.
    1. Crear Indice de **Personas**. Ejecutar un PUT a: __url_instancia_elasticsearch__/persons con el siguiente JSON:
    ``` json
    {
      "mappings": {
        "persons": {
          "properties": {
            "dna": {
              "type": "text",
              "fields": {
                "keyword": {
                  "type": "keyword",
                  "ignore_above": 256
                }
              }
            },
            "isMutant": {
              "type": "boolean"
            }
          }
        }
      }
    }
    ```
    2. Crear Indice de **Stats**. Ejecutar un PUT a: __url_instancia_elasticsearch__/stats con el siguiente JSON:
    ``` json
    {
      "mappings": {
        "stats": {
          "properties": {
            "count_human_dna": {
              "type": "long"
            },
            "count_mutant_dna": {
              "type": "long"
            },
            "ratio": {
              "type": "long"
            }
          }
        }
      }
    }
    ```

# Queue

La queue fue implementada utilizando Firebase, con lo cual es necesario tener una cuenta y una base de datos disponible. Desde la consola de Firebase, se debe descargar el ```serviceAccount.json``` con las credenciales necesarias para poder conectarse a la instancia de Firebase (https://console.firebase.google.com/u/1/project/{nombre_del_proyecto}/settings/serviceaccounts/adminsdk). Este archivos de credenciales debe ser copiado con el nombre __magnetosolution.firebase.credentials.json__ dentro de la carpeta raiz de la soluciós.

Una vez creada la instancia, se debe generar la siguiente estructura:

```json
|-- Instancia
    |--- queue
        |--- tasks
```


# Cómo ejecutar el programa

Es requisito indispensable contar con NodeJS instalado localmente (https://nodejs.org/).

1. Descargar código fuente.
2. Dentro de la carpeta 'meli.magnetosolution' ejecutar el comando *npm install*.
3. Crear un archivo llamado config.json en la raiz del proyecto. Este archivo contiene las configuraciones necesarias para conectarse a la instancia de elasticSearch y Firebase. El contenido de dicho archivo debe ser como el siguiente ejemplo:

``` json
{
  "worker": {
    "queueDatabaseUrl": "{url_instancia_firebase}",
    "queueName": "queue",
    "storageDatabaseUrl": "{url_instancia_elasticSearch}"
  },
  "webapi": {
    "queueDatabaseUrl": "{url_instancia_firebase}",
    "queueName": "queue/tasks",
    "storageDatabaseUrl": "{url_instancia_elasticSearch}"
  }
}
```

4. Dentro de la carpeta 'meli.magnetosolution' ejecutar el comando *npm run start-server-and-worker* .
    1. URL API **mutant**: http://localhost:8080/mutant .
    2. URL API **stats**: http://localhost:8080/stats.

# Working API'S URL
1. Mutant api:
http://ec2-52-14-77-5.us-east-2.compute.amazonaws.com:8080/mutant

2. Stat api:
http://ec2-52-14-77-5.us-east-2.compute.amazonaws.com:8080/stats
