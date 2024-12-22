-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 22-12-2024 a las 18:24:42
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `proyect_db`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comments`
--

CREATE TABLE `comments` (
  `comment_id` int(11) NOT NULL,
  `publication_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `content` text NOT NULL,
  `status` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `comments`
--

INSERT INTO `comments` (`comment_id`, `publication_id`, `user_id`, `content`, `status`, `created_at`) VALUES
(1, 4, 1, 'primer comentario', 1, '2024-12-21 02:28:10'),
(2, 4, 1, 'Segundo comentario', 1, '2024-12-21 02:28:18'),
(3, 4, 1, 'tercer comentario', 1, '2024-12-21 02:28:22'),
(4, 4, 1, 'cuarto comentario', 1, '2024-12-21 02:28:27'),
(5, 4, 1, 'quinto comentario', 1, '2024-12-21 02:28:32'),
(6, 4, 2, 'adsfa', 1, '2024-12-21 04:45:35'),
(7, 4, 2, 'asdfsad', 1, '2024-12-21 04:45:46'),
(8, 4, 2, 'asdfsad', 1, '2024-12-21 04:45:48'),
(9, 4, 2, 'asdfsda', 1, '2024-12-21 04:46:38'),
(10, 4, 2, 'adsfsdf', 1, '2024-12-21 04:48:40'),
(11, 4, 2, 'adsfasdf', 1, '2024-12-21 04:52:10'),
(12, 4, 2, 'holaaa', 1, '2024-12-21 04:52:20'),
(13, 4, 2, 'prueba', 1, '2024-12-21 04:54:19'),
(14, 4, 2, 'prueba2', 1, '2024-12-21 04:58:58'),
(15, 3, 2, 'fadsfa', 1, '2024-12-21 05:02:54'),
(16, 4, 2, 'comentario ', 1, '2024-12-22 16:08:14');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `finished_proyects`
--

CREATE TABLE `finished_proyects` (
  `proyect_id` int(11) NOT NULL,
  `end_date` date NOT NULL,
  `final_budget` decimal(10,3) DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `jacs`
--

CREATE TABLE `jacs` (
  `user_id` int(11) NOT NULL,
  `id_verify` tinyint(1) DEFAULT 0,
  `personery` varchar(50) NOT NULL,
  `commune` int(11) NOT NULL,
  `neighborhood` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `jacs`
--

INSERT INTO `jacs` (`user_id`, `id_verify`, `personery`, `commune`, `neighborhood`) VALUES
(2, 0, 'dfdsafad1', 1, 'ciudad cordoba'),
(17, 0, '41457', 1, 'Ciudad cordoba');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `notes_proyects`
--

CREATE TABLE `notes_proyects` (
  `note_id` int(11) NOT NULL,
  `proyect_id` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `notes_proyects`
--

INSERT INTO `notes_proyects` (`note_id`, `proyect_id`, `title`, `description`) VALUES
(1, 1, 'nota uno', 'esta es una nota'),
(2, 1, 'nota dos', 'esta es una nota');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proyects`
--

CREATE TABLE `proyects` (
  `proyect_id` int(11) NOT NULL,
  `jac_id` int(11) NOT NULL,
  `name_proyect` varchar(50) NOT NULL,
  `location` varchar(50) NOT NULL,
  `description` text NOT NULL,
  `object` text NOT NULL,
  `state` enum('propuesta','proceso','finalizado') DEFAULT 'propuesta',
  `initial_budget` decimal(10,2) DEFAULT NULL,
  `stimated_time` text DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `proyects`
--

INSERT INTO `proyects` (`proyect_id`, `jac_id`, `name_proyect`, `location`, `description`, `object`, `state`, `initial_budget`, `stimated_time`, `start_date`, `created_at`) VALUES
(1, 2, 'cortar pasto', 'parque jaramillo', 'pasto largo', 'cortar el pasto', 'propuesta', 50.00, '1 semana', '2020-02-29', '2024-11-28 14:59:41');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `publications`
--

CREATE TABLE `publications` (
  `publication_id` int(11) NOT NULL,
  `jac_id` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `content` text NOT NULL,
  `public` tinyint(1) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `publications`
--

INSERT INTO `publications` (`publication_id`, `jac_id`, `title`, `content`, `public`, `created_at`) VALUES
(1, 2, 'primera publicacion', 'publicacion de prueba', 1, '2024-12-19 04:08:21'),
(2, 2, 'Segunda publicacion', 'publicacion de prueba', 1, '2024-12-19 04:08:27'),
(3, 2, 'Tercera publicacion', 'publicacion de prueba', 1, '2024-12-19 04:08:37'),
(4, 2, 'Cuarta publicacion', 'publicacion de prueba', 1, '2024-12-19 04:58:39');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `rol_id` int(11) NOT NULL,
  `jac_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `rolname` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`rol_id`, `jac_id`, `user_id`, `rolname`) VALUES
(1, 2, 4, 'tesorero'),
(2, 2, 12, 'presidente'),
(3, 2, 1, 'vicepresidente');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `user_last_name` varchar(50) NOT NULL,
  `birthdate` date NOT NULL,
  `dni` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`user_id`, `user_last_name`, `birthdate`, `dni`) VALUES
(1, 'hernandez', '2020-02-29', 'dfdsafad1'),
(4, 'rodriguez', '2024-12-03', '475275'),
(12, 'rodriguez', '2024-12-02', '465498'),
(33, 'Bustos', '2024-12-04', '4654982');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_base`
--

CREATE TABLE `user_base` (
  `user_id` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `user_type` varchar(50) NOT NULL,
  `double_factor` tinyint(1) DEFAULT 0,
  `status` tinyint(1) DEFAULT 0,
  `telephone` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `user_base`
--

INSERT INTO `user_base` (`user_id`, `email`, `username`, `password`, `user_type`, `double_factor`, `status`, `telephone`, `created_at`) VALUES
(1, 'pablo@gmail.com', 'pablo', '$2a$10$DKFXuPQ1hmGvxUAmk.MIK.IBnhQhOmF7aiLktUPZCAOjeIddVHcCe', 'user_user', 0, 0, 2147483647, '2024-11-28 14:46:56'),
(2, 'junta@gmail.com', 'Junta Cordoba', '$2a$10$HmYXHY3RODMHVCuGlaWSEuJ2fWYyarZ19n/jX/YiZY3ZoCrP0bcKK', 'user_jac', 0, 0, 2147483647, '2024-11-28 14:54:57'),
(4, 'john2@gmail.com', 'john', '$2a$10$.HWy7o5wyov4ZsNcpOzlz.LwLMeR9/6AWol.uPFjmWt5u3pBAfFMS', 'user_user', 0, 0, 2147483647, '2024-12-05 03:38:18'),
(12, 'john3@gmail.com', 'john2', '$2a$10$Y1tPr6KUTfHe9BCBUcJztOvghTTOW/B3pPCoJdTOzcWdxf4k9AJbO', 'user_user', 0, 0, 2147483647, '2024-12-05 03:40:29'),
(17, 'john6@gmail.com', 'john', '$2a$10$sPy8gB24acbccC/2mdXwT.kq.tV8Btr/T1Nn8R3U9qvD.xrp/dypS', 'user_jac', 0, 0, 2147483647, '2024-12-06 02:35:49'),
(33, 'laura@gmail.com', 'laura', '$2a$10$SZGEb64y6ax/5SiDQfVd4uGxVeksCt0gI/IMt8qIenxI0vN1AbZJa', 'user_user', 0, 0, 2147483647, '2024-12-07 03:01:40');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`comment_id`),
  ADD KEY `publication_id` (`publication_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indices de la tabla `finished_proyects`
--
ALTER TABLE `finished_proyects`
  ADD PRIMARY KEY (`proyect_id`);

--
-- Indices de la tabla `jacs`
--
ALTER TABLE `jacs`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `personery` (`personery`);

--
-- Indices de la tabla `notes_proyects`
--
ALTER TABLE `notes_proyects`
  ADD PRIMARY KEY (`note_id`),
  ADD KEY `proyect_id` (`proyect_id`);

--
-- Indices de la tabla `proyects`
--
ALTER TABLE `proyects`
  ADD PRIMARY KEY (`proyect_id`),
  ADD KEY `jac_id` (`jac_id`);

--
-- Indices de la tabla `publications`
--
ALTER TABLE `publications`
  ADD PRIMARY KEY (`publication_id`),
  ADD KEY `jac_id` (`jac_id`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`rol_id`),
  ADD UNIQUE KEY `rolname` (`rolname`),
  ADD UNIQUE KEY `user_id` (`user_id`),
  ADD KEY `jac_id` (`jac_id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `dni` (`dni`);

--
-- Indices de la tabla `user_base`
--
ALTER TABLE `user_base`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `comments`
--
ALTER TABLE `comments`
  MODIFY `comment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla `notes_proyects`
--
ALTER TABLE `notes_proyects`
  MODIFY `note_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `proyects`
--
ALTER TABLE `proyects`
  MODIFY `proyect_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `publications`
--
ALTER TABLE `publications`
  MODIFY `publication_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `rol_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `user_base`
--
ALTER TABLE `user_base`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`publication_id`) REFERENCES `publications` (`publication_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user_base` (`user_id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `finished_proyects`
--
ALTER TABLE `finished_proyects`
  ADD CONSTRAINT `finished_proyects_ibfk_1` FOREIGN KEY (`proyect_id`) REFERENCES `proyects` (`proyect_id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `jacs`
--
ALTER TABLE `jacs`
  ADD CONSTRAINT `jacs_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user_base` (`user_id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `notes_proyects`
--
ALTER TABLE `notes_proyects`
  ADD CONSTRAINT `notes_proyects_ibfk_1` FOREIGN KEY (`proyect_id`) REFERENCES `proyects` (`proyect_id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `proyects`
--
ALTER TABLE `proyects`
  ADD CONSTRAINT `proyects_ibfk_1` FOREIGN KEY (`jac_id`) REFERENCES `jacs` (`user_id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `publications`
--
ALTER TABLE `publications`
  ADD CONSTRAINT `publications_ibfk_1` FOREIGN KEY (`jac_id`) REFERENCES `jacs` (`user_id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `roles`
--
ALTER TABLE `roles`
  ADD CONSTRAINT `roles_ibfk_1` FOREIGN KEY (`jac_id`) REFERENCES `jacs` (`user_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `roles_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL;

--
-- Filtros para la tabla `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user_base` (`user_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
