module.exports = [
    {
        tags: ['ECONNREFUSED'],
        description: {
            'es': 'La conexion con la base de datos ha sido rechazada.',
            'en': 'The connection with the database has been refused.',
            'fr': 'La connexion avec la base de donnees a ete refusee.'
        },
        solution: {
            'es': 'Comprueba que la base de datos este activa y que los datos de conexion sean correctos.',
            'en': 'Check that the database is active and that the connection data is correct.',
            'fr': 'Verifiez que la base de donnees est active et que les donnees de connexion sont correctes.'
        }
    },
    {
        tags: ['language_undefined'],
        description: {
            'es': 'No se puede encontrar el idioma especificado en la configuracion.',
            'en': 'The specified language in the configuration cannot be found.',
            'fr': 'La langue specifiee dans la configuration est introuvable.'
        },
        solution: {
            'es': 'Comprueba que el idioma este especificado en la configuracion, ruta: config.js.',
            'en': 'Check that the language is specified in the configuration, path: config.js.',
            'fr': 'Verifiez que la langue est specifiee dans la configuration, chemin: config.js.'
        }
    },
    {
        tags: ['language_unsupported'],
        description: {
            'es': 'El idioma especificado en la configuracion no esta soportado.',
            'en': 'The specified language in the configuration is not supported.',
            'fr': "La langue specifiee dans la configuration n'est pas prise en charge."
        },
        solution: {
            'es': 'Comprueba que el idioma que esta en la configuracion sea soportado, soportados: {ice_mysql_error_replace}.',
            'en': 'Check that the language in the configuration is supported, supported: {ice_mysql_error_replace}.',
            'fr': 'Verifiez que la langue dans la configuration est prise en charge, prise en charge: {ice_mysql_error_replace}.'
        }
    },
    {
        tags: ["Can't find file"],
        description: {
            'es': 'No se puede encontrar el archivo especificado.',
            'en': 'The specified file cannot be found.',
            'fr': 'Le fichier specifie est introuvable.'
        },
        solution: {
            'es': 'Normalmente esto es debido a que alguien ha eliminado un archivo que ha existido, simplemente reinicia el servidor para que se vuelva a generar el archivo.',
            'en': 'This is usually because someone has deleted a file that has existed, simply restart the server to regenerate the file.',
            'fr': 'Cela est generalement dû au fait que quelqu\'un a supprime un fichier qui a existe, redemarrez simplement le serveur pour regenerer le fichier.'
        }
    },
    {
        tags: ["Can't find a connection pool"],
        description: {
            'es': 'No se puede encontrar un pool de conexiones para la base de datos especificada.',
            'en': "Can't find a connection pool for the specified database.",
            'fr': 'Impossible de trouver un pool de connexions pour la base de donnees specifiee.'
        },
        solution: {
            'es': 'Esto puede ser debido a que la base de datos ya no existe o que algun script ha eliminado el pool de conexiones, reinicia el servidor para que se vuelva a generar el pool de conexiones.',
            'en': 'This may be due to the fact that the database no longer exists or that some script has deleted the connection pool, restart the server to regenerate the connection pool.',
            'fr': 'Cela peut etre du au fait que la base de donnees n\'existe plus ou qu\'un script a supprime le pool de connexions, redemarrez le serveur pour regenerer le pool de connexions.'
        }
    },
    {
        tags: ["getaddrinfo ENOTFOUND"],
        description: {
            'es': 'No se puede encontrar el host especificado.',
            'en': 'The specified host cannot be found.',
            'fr': 'L\'hote specifie est introuvable.'
        },
        solution: {
            'es': 'Asegurate que el host que has especificado esta bien escrito y que el servidor tiene acceso a el.',
            'en': 'Make sure that the host you have specified is well written and that the server has access to it.',
            'fr': 'Assurez-vous que l\'hote que vous avez specifie est bien ecrit et que le serveur y a acces.'
        }
    },
    {
        tags: ["Access denied for user"],
        description: {
            'es': 'Acceso denegado para el usuario especificado.',
            'en': 'Access denied for the specified user.',
            'fr': 'Acces refuse pour l\'utilisateur specifie.'
        },
        solution: {
            'es': 'Asegurate que el usuario que has especificado esta bien escrito y que la contraseña corresponde a ese usuario.',
            'en': 'Make sure that the user you have specified is well written and that the password corresponds to that user.',
            'fr': 'Assurez-vous que l\'utilisateur que vous avez specifie est bien ecrit et que le mot de passe correspond a cet utilisateur.'
        }
    },
    {
        tags: ["Invalid variable type for", "LoadData function"],
        description: {
            'es': 'El tipo de variable especificado no coincide con el esperado. Obtenido: {ice_mysql_error_replace}, esperado: {ice_mysql_error_replace}.',
            'en': 'The specified variable type does not match the expected one.',
            'fr': 'Le type de variable specifie ne correspond pas a celui attendu.'
        },
        solution: {
            'es': 'Asegurate que el tipo de variable que estas intentando obtener coincide con el tipo de variable del valor por defecto.',
            'en': 'Make sure that the type of variable you are trying to obtain matches the type of variable of the default value.',
            'fr': 'Assurez-vous que le type de variable que vous essayez d\'obtenir correspond au type de variable de la valeur par defaut.'
        }
    },
    {
        tags: ["Invalid SaveInterval value"],
        description: {
            'es': 'El valor de SaveInterval establecido en el archivo config.js es invalido.',
            'en': 'The SaveInterval value set in the config.js file is invalid.',
            'fr': 'La valeur SaveInterval definie dans le fichier config.js est invalide.'
        },
        solution: {
            'es': 'Asegurate que el valor de SaveInterval sea un numero y que no sea menor a 5000.',
            'en': 'Make sure that the SaveInterval value is a number and that it is not less than 5000.',
            'fr': 'Assurez-vous que la valeur SaveInterval est un nombre et qu\'elle n\'est pas inferieure a 5000.'
        }
    },
    {
        tags: ["Can't find credentials"],
        description: {
            'es': 'No se puede encontrar las credenciales de la base de datos en el archivo server.cfg.',
            'en': "Can't find the database credentials in the server.cfg file.",
            'fr': 'Impossible de trouver les identifiants de la base de donnees dans le fichier server.cfg.'
        },
        solution: {
            'es': 'Asegurate que las credenciales de la base de datos esten especificadas en el archivo server.cfg, puedes revisar la documentacion.',
            'en': 'Make sure that the database credentials are specified in the server.cfg file, you can check the documentation.',
            'fr': 'Assurez-vous que les identifiants de la base de donnees sont specifies dans le fichier server.cfg, vous pouvez consulter la documentation.'
        }
    },
    {
        tags: ["Invalid credentials provided"],
        description: {
            'es': 'Las credenciales de la base de datos especificadas en el archivo server.cfg estan mal estructuradas.',
            'en': 'The database credentials specified in the server.cfg file are badly structured.',
            'fr': 'Les identifiants de la base de donnees specifies dans le fichier server.cfg sont mal structures.'
        },
        solution: {
            'es': 'Asegurate que las credenciales de la base de datos esten bien estructuradas, ej: "host=127.0.0.1; user=root; password=; database=myFivemServer; port=3306".',
            'en': 'Make sure the database credentials are well structured, eg: "host=127.0.0.1; user=root; password=; database=myFivemServer; port=3306".',
            'fr': 'Assurez-vous que les identifiants de la base de données sont bien structurés, par exemple: "host=127.0.0.1; user=root; password=; database=myFivemServer; port=3306".'
        }
    },
    {
        tags: ["callbacks with Await"],
        description: {
            'es': 'Estás intentando usar un callback con un metodo Await.',
            'en': 'You are trying to use a callback with an Await method.',
            'fr': 'Vous essayez d\'utiliser un rappel avec une methode d\'attente.'
        },
        solution: {
            'es': 'Asegurate que no estes pasando como parametro una funcion al metodo await.',
            'en': 'Make sure you are not passing a function as a parameter to the await method.',
            'fr': 'Assurez-vous que vous ne transmettez pas une fonction en tant que parametre a la methode d\'attente.'
        }
    },
    {
        tags: ["query with parameters but you didn't specify"],
        description: {
            'es': 'Estás intentando ejecutar una consulta con parametros pero no has especificado los valores.',
            'en': "You're trying to execute a query with parameters but you didn't specify the values.",
            'fr': 'Vous essayez d\'executer une requete avec des parametres mais vous n\'avez pas specifie les valeurs.'
        },
        solution: {
            'es': 'Asegurate que estes pasando los valores al metodo si es necesario.',
            'en': 'Make sure you are passing the values to the method if necessary.',
            'fr': 'Assurez-vous que vous transmettez les valeurs a la methode si necessaire.'
        }
    },
    {
        tags: ["is not registered"],
        description: {
            'es': 'Estás intentando ejecutar una consulta en una base de datos que no existe.',
            'en': 'You are trying to execute a query on a database that does not exist.',
            'fr': 'Vous essayez d\'executer une requete sur une base de donnees qui n\'existe pas.'
        },
        solution: {
            'es': 'Asegurate que la base de datos este registrada en el server.cfg con su correspondiente identificador.',
            'en': 'Make sure the database is registered in the server.cfg with its corresponding identifier.',
            'fr': 'Assurez-vous que la base de donnees est enregistree dans le server.cfg avec son identifiant correspondant.'
        }
    },
    {
        tags: ["Error deleting files"],
        description: {
            'es': 'Ha ocurrido un error al eliminar los archivos. Mensaje: {ice_mysql_error_replace}',
            'en': 'An error occurred while deleting the files. Message: {ice_mysql_error_replace}',
            'fr': 'Une erreur s\'est produite lors de la suppression des fichiers. Message: {ice_mysql_error_replace}'
        },
        solution: {
            'es': 'Asegurate de que ningun programa este utilizando ese archivo y que no este en una ubicacion que necesite altos privilegios.',
            'en': 'Make sure that no program is using that file and that it is not in a location that requires high privileges.',
            'fr': 'Assurez-vous qu\'aucun programme n\'utilise ce fichier et qu\'il ne se trouve pas dans un emplacement qui necessite des privileges eleves.'
        }
    },
    {
        tags: ["Backup error"],
        description: {
            'es': 'Ha ocurrido un error al realizar el backup. Mensaje: {ice_mysql_error_replace}',
            'en': 'An error occurred while making the backup. Message: {ice_mysql_error_replace}',
            'fr': 'Une erreur s\'est produite lors de la sauvegarde. Message: {ice_mysql_error_replace}'
        },
        solution: {
            'es': 'Asegurate de que el archivo mysqldump.exe este en la ruta especificada en la configuracion y que la ubicacion de exportacion no depende de privilegios de administrador.',
            'en': 'Make sure that the mysqldump.exe file is in the path specified in the configuration and that the export location does not depend on administrator privileges.',
            'fr': 'Assurez-vous que le fichier mysqldump.exe se trouve dans le chemin specifie dans la configuration et que l\'emplacement d\'exportation ne depend pas des privileges d\'administrateur.'
        }
    },
    {
        tags: ["Can't connect to ORM"],
        description: {
            'es': 'No se puede conectar a la base de datos con la biblioteca de ORM.',
            'en': "Can't connect to the database with the ORM library.",
            'fr': 'Impossible de se connecter a la base de donnees avec la bibliotheque ORM.'
        },
        solution: {
            'es': 'Asegurate de que la base de datos este activa, que los datos de conexion sean correctos y que las credenciales proporcionadas en el server.cfg puedan entrar mas de una conexion.',
            'en': 'Make sure the database is active, that the connection data is correct, and that the credentials provided in the server.cfg can enter more than one connection.',
            'fr': 'Assurez-vous que la base de donnees est active, que les donnees de connexion sont correctes et que les identifiants fournis dans le server.cfg peuvent entrer plus d\'une connexion.'
        }
    },
    {
        tags: ["Can't make query with ORM database"],
        description: {
            'es': 'No se puede realizar la consulta con la biblioteca de ORM a la base de datos.',
            'en': "Can't make the query with the ORM library to the database.",
            'fr': 'Impossible d\'effectuer la requete avec la bibliotheque ORM vers la base de donnees.'
        },
        solution: {
            'es': 'Asegurate de que haz estructurado bien todos los datos de la consulta.',
            'en': 'Make sure you have structured all the query data well.',
            'fr': 'Assurez-vous que vous avez bien structure toutes les donnees de la requete.'
        }
    },
    {
        tags: ["You have enabled the discord"],
        description: {
            'es': 'Has habilitado los logs de discord pero no has especificado el webhook en el config.js.',
            'en': 'You have enabled the discord logs but you have not specified the webhook in the config.js.',
            'fr': 'Vous avez active les journaux discord mais vous n\'avez pas specifie le webhook dans le config.js.'
        },
        solution: {
            'es': 'Asegurate de que el webhook este especificado en el config.js.',
            'en': 'Make sure the webhook is specified in the config.js.',
            'fr': 'Assurez-vous que le webhook est specifie dans le config.js.'
        }
    },
    {
        tags: ["Error sending message to discord webhook"],
        description: {
            'es': 'Ha ocurrido un error al enviar el mensaje al webhook de discord.',
            'en': 'An error occurred while sending the message to the discord webhook.',
            'fr': 'Une erreur s\'est produite lors de l\'envoi du message au webhook discord.'
        },
        solution: {
            'es': 'Asegurate de que el webhook exista y que la ip del servidor no haya sido limitada por discord, si es así significa que se estan enviando demasiados mensajes desde tu servidor hacia discord.',
            'en': 'Make sure the webhook exists and that the server ip has not been limited by discord, if so it means that too many messages are being sent from your server to discord.',
            'fr': 'Assurez-vous que le webhook existe et que l\'ip du serveur n\'a pas ete limitee par discord, si c\'est le cas, cela signifie que trop de messages sont envoyes de votre serveur a discord.'
        }
    },
    {
        tags: ["Can't create file at"],
        description: {
            'es': 'No se puede crear el archivo en la ruta especificada o el servidor no tiene permisos suficentes.',
            'en': "Can't create the file in the specified path or the server does not have sufficient permissions.",
            'fr': 'Impossible de creer le fichier dans le chemin specifie ou le serveur n\'a pas les autorisations suffisantes.'
        },
        solution: {
            'es': 'Asegurate de que la ruta especificada exista y que el servidor tenga permisos suficientes para crear archivos en ese directorio.',
            'en': 'Make sure the specified path exists and that the server has sufficient permissions to create files in that directory.',
            'fr': 'Assurez-vous que le chemin specifie existe et que le serveur dispose des autorisations suffisantes pour creer des fichiers dans ce repertoire.'
        }
    },
    {
        tags: ["Incorrect arguments to mysqld_stmt_execute"],
        description: {
            'es': 'La consulta no puede realizarse porque se han especificado argumentos incorrectos.',
            'en': 'The query cannot be performed because incorrect arguments have been specified.',
            'fr': 'La requete ne peut pas etre effectuee car des arguments incorrects ont ete specifies.'
        },
        solution: {
            'es': 'Asegurate de que los parametros de la consulta sean correctos y que esten dentro de un objeto.',
            'en': 'Make sure that the query parameters are correct and that they are within an object.',
            'fr': 'Assurez-vous que les parametres de la requete sont corrects et qu\'ils se trouvent dans un objet.'
        }
    }
]