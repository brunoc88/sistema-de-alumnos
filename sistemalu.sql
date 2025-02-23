-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 23-02-2025 a las 17:45:40
-- Versión del servidor: 10.4.25-MariaDB
-- Versión de PHP: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `sistemalu`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alumno`
--

CREATE TABLE `alumno` (
  `idAlumno` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `apellido` varchar(255) NOT NULL,
  `dni` varchar(255) NOT NULL,
  `estado` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `alumno`
--

INSERT INTO `alumno` (`idAlumno`, `nombre`, `apellido`, `dni`, `estado`) VALUES
(1, 'Thiago ', 'Gutierrez ', '012', 1),
(2, 'Pedro', 'Rodriguez', '003', 1),
(3, 'Leangro', 'Rodriguez', '005', 1),
(4, 'Pablo', 'Torres', '006', 1),
(5, 'Lucrecia', 'Lucero', '007', 1),
(6, 'Gabriela', 'Fernandez', '008', 1),
(7, 'Belen', 'Rosales', '009', 1),
(8, 'Rodrigo', 'Lopez', '010', 1),
(9, 'Ramon', 'Avila', '111', 1),
(10, 'Florencia', 'Franco', '123', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alumno-materia`
--

CREATE TABLE `alumno-materia` (
  `idAlufk` int(11) NOT NULL,
  `idMatfk` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `alumno-materia`
--

INSERT INTO `alumno-materia` (`idAlufk`, `idMatfk`) VALUES
(1, 1),
(2, 2),
(3, 1),
(4, 2),
(5, 1),
(6, 1),
(6, 2),
(7, 1),
(7, 2),
(8, 2),
(9, 1),
(10, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `materia`
--

CREATE TABLE `materia` (
  `idMateria` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `estado` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `materia`
--

INSERT INTO `materia` (`idMateria`, `nombre`, `estado`) VALUES
(1, 'Base de Datos', 1),
(2, 'JavaScript', 1),
(3, 'React', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `nota`
--

CREATE TABLE `nota` (
  `idNota` int(11) NOT NULL,
  `calificacion` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `id_materia` int(11) DEFAULT NULL,
  `id_alumno` int(11) DEFAULT NULL,
  `id_usuario` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `nota`
--

INSERT INTO `nota` (`idNota`, `calificacion`, `fecha`, `id_materia`, `id_alumno`, `id_usuario`) VALUES
(1, 9, '2025-02-22', 1, 7, NULL),
(2, 7, '2025-02-22', 2, 7, NULL),
(3, 8, '2025-02-22', 1, 7, NULL),
(4, 10, '2025-02-22', 1, 7, NULL),
(5, 7, '2025-02-22', 2, 7, NULL),
(6, 8, '2025-02-22', 2, 7, NULL),
(7, 10, '2025-02-22', 1, 1, NULL),
(8, 4, '2025-02-22', 1, 9, 3),
(9, 5, '2025-02-22', 1, 9, 3),
(10, 7, '2025-02-22', 1, 9, 3),
(11, 7, '2025-02-23', 2, 4, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `idUsuario` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `apellido` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `dni` varchar(255) NOT NULL,
  `rol` varchar(255) NOT NULL,
  `estado` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`idUsuario`, `nombre`, `apellido`, `email`, `password`, `dni`, `rol`, `estado`) VALUES
(3, 'Bruno', 'Cerutti', 'bruno@gmail.com', '$2b$10$p40EthUYHnXlWcrik1YOG.IQ.0vVqEWLUeeYLdrIzXIiEJIPGqfvC', '001', 'Admin', 1),
(5, 'Belen ', 'Rosas', 'belen@gmail.com', '$2b$10$gmqluBA5yrVQQ6TfRZ7cEu9lIPljR7aNwNAQdGi8cln3oOv8Xtqa.', '009', 'Estudiante', 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `alumno`
--
ALTER TABLE `alumno`
  ADD PRIMARY KEY (`idAlumno`),
  ADD UNIQUE KEY `dni` (`dni`);

--
-- Indices de la tabla `alumno-materia`
--
ALTER TABLE `alumno-materia`
  ADD PRIMARY KEY (`idAlufk`,`idMatfk`),
  ADD KEY `idMatfk` (`idMatfk`);

--
-- Indices de la tabla `materia`
--
ALTER TABLE `materia`
  ADD PRIMARY KEY (`idMateria`),
  ADD UNIQUE KEY `nombre` (`nombre`);

--
-- Indices de la tabla `nota`
--
ALTER TABLE `nota`
  ADD PRIMARY KEY (`idNota`),
  ADD KEY `id_materia` (`id_materia`),
  ADD KEY `id_alumno` (`id_alumno`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`idUsuario`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `alumno`
--
ALTER TABLE `alumno`
  MODIFY `idAlumno` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `materia`
--
ALTER TABLE `materia`
  MODIFY `idMateria` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `nota`
--
ALTER TABLE `nota`
  MODIFY `idNota` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `idUsuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `alumno-materia`
--
ALTER TABLE `alumno-materia`
  ADD CONSTRAINT `alumno-materia_ibfk_1` FOREIGN KEY (`idAlufk`) REFERENCES `alumno` (`idAlumno`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `alumno-materia_ibfk_2` FOREIGN KEY (`idMatfk`) REFERENCES `materia` (`idMateria`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `nota`
--
ALTER TABLE `nota`
  ADD CONSTRAINT `nota_ibfk_1` FOREIGN KEY (`id_materia`) REFERENCES `materia` (`idMateria`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `nota_ibfk_2` FOREIGN KEY (`id_alumno`) REFERENCES `alumno` (`idAlumno`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `nota_ibfk_3` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`idUsuario`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
