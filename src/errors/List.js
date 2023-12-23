module.exports = [
    {
        tags: ['ECONNREFUSED'],
        description: {
            'es': 'La conexion con la base de datos ha sido rechazada.',
            'en': 'The connection with the database has been refused.',
            'fr': 'La connexion avec la base de donnees a ete refusee.',
            'pt-BR': 'A conexão com o banco de dados foi recusada.'
        },
        solution: {
            'es': 'Comprueba que la base de datos este activa y que los datos de conexion sean correctos.',
            'en': 'Check that the database is active and that the connection data is correct.',
            'fr': 'Verifiez que la base de donnees est active et que les donnees de connexion sont correctes.',
            'pt-BR': 'Verifique se o banco de dados está ativo e se os dados de conexão estão corretos.'
        }
    },
    {
        tags: ['language_undefined'],
        description: {
            'es': 'No se puede encontrar el idioma especificado en la configuracion.',
            'en': 'The specified language in the configuration cannot be found.',
            'fr': 'La langue specifiee dans la configuration est introuvable.',
            'pt-BR': 'Não é possível encontrar o idioma especificado na configuração.'
        },
        solution: {
            'es': 'Comprueba que el idioma este especificado en la configuracion, ruta: config.js.',
            'en': 'Check that the language is specified in the configuration, path: config.js.',
            'fr': 'Verifiez que la langue est specifiee dans la configuration, chemin: config.js.',
            'pt-BR': 'Verifique se o idioma está especificado na configuração, caminho: config.js.'
        }
    },
    {
        tags: ['language_unsupported'],
        description: {
            'es': 'El idioma especificado en la configuracion no esta soportado.',
            'en': 'The specified language in the configuration is not supported.',
            'fr': "La langue specifiee dans la configuration n'est pas prise en charge.",
            'pt-BR': 'O idioma selecionado na configuração não é compatível.'
        },
        solution: {
            'es': 'Comprueba que el idioma que esta en la configuracion sea soportado, soportados: {icmysql_error_replace}.',
            'en': 'Check that the language in the configuration is supported, supported: {icmysql_error_replace}.',
            'fr': 'Verifiez que la langue dans la configuration est prise en charge, prise en charge: {icmysql_error_replace}.',
            'pt-BR': 'Certifique-se de que o idioma especificado na configuração seja válido. Idiomas Compatíveis: {icmysql_error_replace}.'
        }
    },
    {
        tags: ["Can't find file"],
        description: {
            'es': 'No se puede encontrar el archivo especificado.',
            'en': 'The specified file cannot be found.',
            'fr': 'Le fichier spécifié est introuvable.',
            'pt-BR': 'Não é possível encontrar o arquivo especificado.'
        },
        solution: {
            'es': 'Normalmente esto es debido a que alguien ha eliminado un archivo que ha existido, simplemente reinicia el servidor para que se vuelva a generar el archivo.',
            'en': 'This is usually because someone has deleted a file that has existed, simply restart the server to regenerate the file.',
            'fr': 'Cela est generalement dû au fait que quelqu\'un a supprime un fichier qui a existe, redemarrez simplement le serveur pour regenerer le fichier.',
            'pt-BR': 'Isso geralmente ocorre porque alguém excluiu um arquivo que existia. Basta reiniciar o servidor para regenerar o arquivo.'
        }
    },
    {
        tags: ["Can't find a connection pool"],
        description: {
            'es': 'No se puede encontrar un pool de conexiones para la base de datos especificada.',
            'en': "Can't find a connection pool for the specified database.",
            'fr': 'Impossible de trouver un pool de connexions pour la base de donnees specifiee.',
            'pt-BR': 'Não é possível encontrar um pool de conexões para o banco de dados especificado.'
        },
        solution: {
            'es': 'Esto puede ser debido a que la base de datos ya no existe o que algun script ha eliminado el pool de conexiones, reinicia el servidor para que se vuelva a generar el pool de conexiones.',
            'en': 'This may be due to the fact that the database no longer exists or that some script has deleted the connection pool, restart the server to regenerate the connection pool.',
            'fr': 'Cela peut etre du au fait que la base de donnees n\'existe plus ou qu\'un script a supprime le pool de connexions, redemarrez le serveur pour regenerer le pool de connexions.',
            'pt-BR': 'Isso pode ocorrer porque o banco de dados não existe mais ou porque algum script excluiu o pool de conexões. Reinicie o servidor para regenerar o pool de conexões.'
        }
    },
    {
        tags: ["getaddrinfo ENOTFOUND"],
        description: {
            'es': 'No se puede encontrar el host especificado.',
            'en': 'The specified host cannot be found.',
            'fr': 'L\'hote specifie est introuvable.',
            'pt-BR': 'Não é possível encontrar o host especificado.'
        },
        solution: {
            'es': 'Asegurate que el host que has especificado esta bien escrito y que el servidor tiene acceso a el.',
            'en': 'Make sure that the host you have specified is well written and that the server has access to it.',
            'fr': 'Assurez-vous que l\'hote que vous avez specifie est bien ecrit et que le serveur y a acces.',
            'pt-BR': 'Certifique-se de que o host especificado está escrito corretamente e que o servidor tem acesso a ele.'
        }
    },
    {
        tags: ["Access denied for user"],
        description: {
            'es': 'Acceso denegado para el usuario especificado.',
            'en': 'Access denied for the specified user.',
            'fr': 'Acces refuse pour l\'utilisateur specifie.',
            'pt-BR': 'Acesso negado para o usuário especificado.'
        },
        solution: {
            'es': 'Asegurate que el usuario que has especificado esta bien escrito y que la contraseña corresponde a ese usuario.',
            'en': 'Make sure that the user you have specified is well written and that the password corresponds to that user.',
            'fr': 'Assurez-vous que l\'utilisateur que vous avez specifie est bien ecrit et que le mot de passe correspond a cet utilisateur.',
            'pt-BR': 'Certifique-se de que o usuário especificado está escrito corretamente e que a senha corresponde a esse usuário.'
        }
    },
    {
        tags: ["Invalid variable type for", "LoadData function"],
        description: {
            'es': 'El tipo de variable especificado no coincide con el esperado. Obtenido: {icmysql_error_replace}, esperado: {icmysql_error_replace}.',
            'en': 'The specified variable type does not match the expected one.',
            'fr': 'Le type de variable specifie ne correspond pas a celui attendu.',
            'pt-BR': 'O tipo de variável especificado não corresponde ao esperado. Obtido: {icmysql_error_replace}, esperado: {icmysql_error_replace}.'
        },
        solution: {
            'es': 'Asegurate que el tipo de variable que estas intentando obtener coincide con el tipo de variable del valor por defecto.',
            'en': 'Make sure that the type of variable you are trying to obtain matches the type of variable of the default value.',
            'fr': 'Assurez-vous que le type de variable que vous essayez d\'obtenir correspond au type de variable de la valeur par defaut.',
            'pt-BR': 'Certifique-se de que o tipo de variável que você está tentando obter corresponde ao tipo de variável do valor padrão.'
        }
    },
    {
        tags: ["Invalid SaveInterval value"],
        description: {
            'es': 'El valor de SaveInterval establecido en el archivo config.js es invalido.',
            'en': 'The SaveInterval value set in the config.js file is invalid.',
            'fr': 'La valeur SaveInterval definie dans le fichier config.js est invalide.',
            'pt-BR': 'O valor de SaveInterval definido no arquivo config.js é inválido.'
        },
        solution: {
            'es': 'Asegurate que el valor de SaveInterval sea un numero y que no sea menor a 5000.',
            'en': 'Make sure that the SaveInterval value is a number and that it is not less than 5000.',
            'fr': 'Assurez-vous que la valeur SaveInterval est un nombre et qu\'elle n\'est pas inferieure a 5000.',
            'pt-BR': 'Certifique-se de que o valor de SaveInterval seja um número e que não seja menor que 5000.'
        }
    },
    {
        tags: ["Can't find credentials"],
        description: {
            'es': 'No se puede encontrar las credenciales de la base de datos en el archivo server.cfg.',
            'en': "Can't find the database credentials in the server.cfg file.",
            'fr': 'Impossible de trouver les identifiants de la base de donnees dans le fichier server.cfg.',
            'pt-BR': 'Não é possível encontrar as credenciais do banco de dados no arquivo server.cfg.'
        },
        solution: {
            'es': 'Asegurate que las credenciales de la base de datos esten especificadas en el archivo server.cfg, puedes revisar la documentacion.',
            'en': 'Make sure that the database credentials are specified in the server.cfg file, you can check the documentation.',
            'fr': 'Assurez-vous que les identifiants de la base de donnees sont specifies dans le fichier server.cfg, vous pouvez consulter la documentation.',
            'pt-BR': 'Certifique-se de que as credenciais do banco de dados estão especificadas no arquivo server.cfg, você pode verificar a documentação.'
        }
    },
    {
        tags: ["Invalid credentials provided"],
        description: {
            'es': 'Las credenciales de la base de datos especificadas en el archivo server.cfg estan mal estructuradas.',
            'en': 'The database credentials specified in the server.cfg file are badly structured.',
            'fr': 'Les identifiants de la base de donnees specifies dans le fichier server.cfg sont mal structures.',
            'pt-BR': 'As credenciais do banco de dados especificadas no arquivo server.cfg estão mal estruturadas.'
        },
        solution: {
            'es': 'Asegurate que las credenciales de la base de datos esten bien estructuradas, ej: "host=127.0.0.1; user=root; password=; database=myFivemServer; port=3306".',
            'en': 'Make sure the database credentials are well structured, eg: "host=127.0.0.1; user=root; password=; database=myFivemServer; port=3306".',
            'fr': 'Assurez-vous que les identifiants de la base de données sont bien structurés, par exemple: "host=127.0.0.1; user=root; password=; database=myFivemServer; port=3306".',
            'pt-BR': 'Certifique-se de que as credenciais do banco de dados estão bem estruturadas, por exemplo: "host=127.0.0.1; user=root; password=; database=myFivemServer; port=3306".'
        }
    },
    {
        tags: ["callbacks with Await"],
        description: {
            'es': 'Estás intentando usar un callback con un metodo Await.',
            'en': 'You are trying to use a callback with an Await method.',
            'fr': 'Vous essayez d\'utiliser un rappel avec une methode d\'attente.',
            'pt-BR': 'Você está tentando usar um callback com um método Await.'
        },
        solution: {
            'es': 'Asegurate que no estes pasando como parametro una funcion al metodo await.',
            'en': 'Make sure you are not passing a function as a parameter to the await method.',
            'fr': 'Assurez-vous que vous ne transmettez pas une fonction en tant que parametre a la methode d\'attente.',
            'pt-BR': 'Certifique-se de não passar uma função como parâmetro para o método await.'
        }
    },
    {
        tags: ["query with parameters but you didn't specify"],
        description: {
            'es': 'Estás intentando ejecutar una consulta con parametros pero no has especificado los valores.',
            'en': "You're trying to execute a query with parameters but you didn't specify the values.",
            'fr': 'Vous essayez d\'executer une requete avec des parametres mais vous n\'avez pas specifie les valeurs.',
            'pt-BR': 'Você está tentando executar uma consulta com parâmetros, mas não especificou os valores.'
        },
        solution: {
            'es': 'Asegurate que estes pasando los valores al metodo si es necesario.',
            'en': 'Make sure you are passing the values to the method if necessary.',
            'fr': 'Assurez-vous que vous transmettez les valeurs a la methode si necessaire.',
            'pt-BR': 'Certifique-se de passar os valores para o método, se necessário.'
        }
    },
    {
        tags: ["is not registered"],
        description: {
            'es': 'Estás intentando ejecutar una consulta en una base de datos que no existe.',
            'en': 'You are trying to execute a query on a database that does not exist.',
            'fr': 'Vous essayez d\'executer une requete sur une base de donnees qui n\'existe pas.',
            'pt-BR': 'Você está tentando executar uma consulta em um banco de dados que não existe.'
        },
        solution: {
            'es': 'Asegurate que la base de datos este registrada en el server.cfg con su correspondiente identificador.',
            'en': 'Make sure the database is registered in the server.cfg with its corresponding identifier.',
            'fr': 'Assurez-vous que la base de donnees est enregistree dans le server.cfg avec son identifiant correspondant.',
            'pt-BR': 'Certifique-se de que o banco de dados esteja registrado no server.cfg com seu identificador correspondente.'
        }
    },
    {
        tags: ["Error deleting files"],
        description: {
            'es': 'Ha ocurrido un error al eliminar los archivos. Mensaje: {icmysql_error_replace}',
            'en': 'An error occurred while deleting the files. Message: {icmysql_error_replace}',
            'fr': 'Une erreur s\'est produite lors de la suppression des fichiers. Message: {icmysql_error_replace}',
            'pt-BR': 'Ocorreu um erro ao excluir os arquivos. Mensagem: {icmysql_error_replace}'
        },
        solution: {
            'es': 'Asegurate de que ningun programa este utilizando ese archivo y que no este en una ubicacion que necesite altos privilegios.',
            'en': 'Make sure that no program is using that file and that it is not in a location that requires high privileges.',
            'fr': 'Assurez-vous qu\'aucun programme n\'utilise ce fichier et qu\'il ne se trouve pas dans un emplacement qui necessite des privileges eleves.',
            'pt-BR': 'Certifique-se de que nenhum programa esteja usando esse arquivo e que ele não esteja em um local que exija privilégios elevados.'
        }
    },
    {
        tags: ["Backup error"],
        description: {
            'es': 'Ha ocurrido un error al realizar el backup. Mensaje: {icmysql_error_replace}',
            'en': 'An error occurred while making the backup. Message: {icmysql_error_replace}',
            'fr': 'Une erreur s\'est produite lors de la sauvegarde. Message: {icmysql_error_replace}',
            'pt-BR': 'Ocorreu um erro ao fazer o backup. Mensagem: {icmysql_error_replace}'
        },
        solution: {
            'es': 'Asegurate de que el archivo mysqldump.exe este en la ruta especificada en la configuracion y que la ubicacion de exportacion no depende de privilegios de administrador.',
            'en': 'Make sure that the mysqldump.exe file is in the path specified in the configuration and that the export location does not depend on administrator privileges.',
            'fr': 'Assurez-vous que le fichier mysqldump.exe se trouve dans le chemin specifie dans la configuration et que l\'emplacement d\'exportation ne depend pas des privileges d\'administrateur.',
            'pt-BR': 'Certifique-se de que o arquivo mysqldump.exe esteja no caminho especificado na configuração e que o local de exportação não dependa de privilégios de administrador.'
        }
    },
    {
        tags: ["Can't connect to ORM"],
        description: {
            'es': 'No se puede conectar a la base de datos con la biblioteca de ORM.',
            'en': "Can't connect to the database with the ORM library.",
            'fr': 'Impossible de se connecter a la base de donnees avec la bibliotheque ORM.',
            'pt-BR': 'Não é possível conectar-se ao banco de dados com a biblioteca ORM.'
        },
        solution: {
            'es': 'Asegurate de que la base de datos este activa, que los datos de conexion sean correctos y que las credenciales proporcionadas en el server.cfg puedan entrar mas de una conexion.',
            'en': 'Make sure the database is active, that the connection data is correct, and that the credentials provided in the server.cfg can enter more than one connection.',
            'fr': 'Assurez-vous que la base de donnees est active, que les donnees de connexion sont correctes et que les identifiants fournis dans le server.cfg peuvent entrer plus d\'une connexion.',
            'pt-BR': 'Certifique-se de que o banco de dados esteja ativo, que os dados de conexão estejam corretos e que as credenciais fornecidas no server.cfg possam inserir mais de uma conexão.'
        }
    },
    {
        tags: ["Can't make query with ORM database"],
        description: {
            'es': 'No se puede realizar la consulta con la biblioteca de ORM a la base de datos.',
            'en': "Can't make the query with the ORM library to the database.",
            'fr': 'Impossible d\'effectuer la requete avec la bibliotheque ORM vers la base de donnees.',
            'pt-BR': 'Não é possível fazer a consulta com a biblioteca ORM ao banco de dados.'
        },
        solution: {
            'es': 'Asegurate de que haz estructurado bien todos los datos de la consulta.',
            'en': 'Make sure you have structured all the query data well.',
            'fr': 'Assurez-vous que vous avez bien structure toutes les donnees de la requete.',
            'pt-BR': 'Certifique-se de ter estruturado bem todos os dados da consulta.'
        }
    },
    {
        tags: ["You have enabled the discord"],
        description: {
            'es': 'Has habilitado los logs de discord pero no has especificado el webhook en el config.js.',
            'en': 'You have enabled the discord logs but you have not specified the webhook in the config.js.',
            'fr': 'Vous avez active les journaux discord mais vous n\'avez pas specifie le webhook dans le config.js.',
            'pt-BR': 'Você ativou os logs do discord, mas não especificou o webhook no config.js.'
        },
        solution: {
            'es': 'Asegurate de que el webhook este especificado en el config.js.',
            'en': 'Make sure the webhook is specified in the config.js.',
            'fr': 'Assurez-vous que le webhook est specifie dans le config.js.',
            'pt-BR': 'Certifique-se de que o webhook esteja especificado no config.js.'
        }
    },
    {
        tags: ["Error sending message to discord webhook"],
        description: {
            'es': 'Ha ocurrido un error al enviar el mensaje al webhook de discord.',
            'en': 'An error occurred while sending the message to the discord webhook.',
            'fr': 'Une erreur s\'est produite lors de l\'envoi du message au webhook discord.',
            'pt-BR': 'Ocorreu um erro ao enviar a mensagem para o webhook do discord.'
        },
        solution: {
            'es': 'Asegurate de que el webhook exista y que la ip del servidor no haya sido limitada por discord, si es así significa que se estan enviando demasiados mensajes desde tu servidor hacia discord.',
            'en': 'Make sure the webhook exists and that the server ip has not been limited by discord, if so it means that too many messages are being sent from your server to discord.',
            'fr': 'Assurez-vous que le webhook existe et que l\'ip du serveur n\'a pas ete limitee par discord, si c\'est le cas, cela signifie que trop de messages sont envoyes de votre serveur a discord.',
            'pt-BR': 'Certifique-se de que o webhook existe e que o ip do servidor não foi limitado pelo discord, se sim significa que muitas mensagens estão sendo enviadas do seu servidor para o discord.'
        }
    },
    {
        tags: ["Can't create file at"],
        description: {
            'es': 'No se puede crear el archivo en la ruta especificada o el servidor no tiene permisos suficentes.',
            'en': "Can't create the file in the specified path or the server does not have sufficient permissions.",
            'fr': 'Impossible de creer le fichier dans le chemin specifie ou le serveur n\'a pas les autorisations suffisantes.',
            'pt-BR': 'Não é possível criar o arquivo no caminho especificado ou o servidor não possui permissões suficientes.'
        },
        solution: {
            'es': 'Asegurate de que la ruta especificada exista y que el servidor tenga permisos suficientes para crear archivos en ese directorio.',
            'en': 'Make sure the specified path exists and that the server has sufficient permissions to create files in that directory.',
            'fr': 'Assurez-vous que le chemin specifie existe et que le serveur dispose des autorisations suffisantes pour creer des fichiers dans ce repertoire.',
            'pt-BR': 'Certifique-se de que o caminho especificado exista e que o servidor tenha permissões suficientes para criar arquivos nesse diretório.'
        }
    },
    {
        tags: ["Incorrect arguments to mysqld_stmt_execute"],
        description: {
            'es': 'La consulta no puede realizarse porque se han especificado argumentos incorrectos.',
            'en': 'The query cannot be performed because incorrect arguments have been specified.',
            'fr': 'La requete ne peut pas etre effectuee car des arguments incorrects ont ete specifies.',
            'pt-BR': 'A consulta não pode ser executada porque argumentos incorretos foram especificados.'
        },
        solution: {
            'es': 'Asegurate de que los parametros de la consulta sean correctos y que esten dentro de un objeto.',
            'en': 'Make sure that the query parameters are correct and that they are within an object.',
            'fr': 'Assurez-vous que les parametres de la requete sont corrects et qu\'ils se trouvent dans un objet.',
            'pt-BR': 'Certifique-se de que os parâmetros de consulta estejam corretos e dentro de um objeto.'
        }
    },
    {
        tags: ["Error in nested ref call"],
        description: {
            'es': 'Ha ocurrido un error al intentar ejecutar el callback proporcioando a la query.',
            'en': 'An error occurred while trying to execute the callback provided to the query.',
            'fr': 'Une erreur s\'est produite lors de la tentative d\'execution du rappel fourni a la requete.',
            'pt-BR': 'Ocorreu um erro ao tentar executar o retorno de chamada fornecido para a consulta.'
        },
        solution: {
            'es': 'Revisa de que el codigo del callback tenga una sintaxis correcta y que no estes intentando acceder a un parametro nil.',
            'en': 'Check that the callback code has a correct syntax and that you are not trying to access a nil parameter.',
            'fr': 'Verifiez que le code de rappel a une syntaxe correcte et que vous n\'essayez pas d\'acceder a un parametre nil.',
            'pt-BR': 'Verifique se o código de retorno de chamada possui uma sintaxe correta e se você não está tentando acessar um parâmetro nulo.'
        }
    }
]