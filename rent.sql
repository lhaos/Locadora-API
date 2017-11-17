-- --------------------------------------------------------
-- Servidor:                     127.0.0.1
-- Versão do servidor:           10.1.13-MariaDB - mariadb.org binary distribution
-- OS do Servidor:               Win32
-- HeidiSQL Versão:              9.3.0.4984
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Copiando estrutura do banco de dados para rent
CREATE DATABASE IF NOT EXISTS `rent` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `rent`;


-- Copiando estrutura para tabela rent.clients
CREATE TABLE IF NOT EXISTS `clients` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(125) NOT NULL,
  `email` varchar(75) NOT NULL,
  `password` varchar(255) NOT NULL,
  `access_token` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- Copiando dados para a tabela rent.clients: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `clients` DISABLE KEYS */;
/*!40000 ALTER TABLE `clients` ENABLE KEYS */;


-- Copiando estrutura para tabela rent.movies
CREATE TABLE IF NOT EXISTS `movies` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(175) NOT NULL,
  `director` varchar(125) NOT NULL,
  `amount` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

-- Copiando dados para a tabela rent.movies: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `movies` DISABLE KEYS */;
INSERT INTO `movies` (`id`, `title`, `director`, `amount`) VALUES
	(1, 'Star Wars Episódio I: A Ameaça Fantasma', 'George Lucas', 5),
	(2, 'Star Wars Episódio II: Ataque dos Clones', 'George Lucas', 5),
	(3, 'Star Wars Episódio III: A Vingança dos Sith', 'George Lucas', 5),
	(4, 'Star Wars Episódio IV: Uma Nova Esperança', 'George Lucas', 5),
	(5, 'Star Wars Episódio V: O Império Contra-Ataca', 'Irvin Kershner', 5),
	(6, 'Star Wars Episódio VI: O Retorno de Jedi', 'Richard Marquand', 5),
	(7, 'Star Wars Episódio VII: O Despertar da Força', 'J. J. Abrams', 5),
	(8, 'Rogue One - Uma História Star Wars', 'Gareth Edwards', 5);
/*!40000 ALTER TABLE `movies` ENABLE KEYS */;


-- Copiando estrutura para tabela rent.rents
CREATE TABLE IF NOT EXISTS `rents` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `client_id` int(11) NOT NULL,
  `movie_id` int(11) NOT NULL,
  `rent_date` timestamp NULL DEFAULT NULL,
  `expected_date` timestamp NULL DEFAULT NULL,
  `return_date` timestamp NULL DEFAULT NULL,
  `returned` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `fk_historics_clients_idx` (`client_id`),
  KEY `fk_historics_movies1_idx` (`movie_id`),
  CONSTRAINT `fk_historics_clients` FOREIGN KEY (`client_id`) REFERENCES `clients` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_historics_movies1` FOREIGN KEY (`movie_id`) REFERENCES `movies` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- Copiando dados para a tabela rent.rents: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `rents` DISABLE KEYS */;
/*!40000 ALTER TABLE `rents` ENABLE KEYS */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
