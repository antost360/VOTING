-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Czas generowania: 20 Mar 2023, 06:32
-- Wersja serwera: 10.4.27-MariaDB
-- Wersja PHP: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Baza danych: `voting`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `admin_haslo`
--

CREATE TABLE `admin_haslo` (
  `haslo` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Zrzut danych tabeli `admin_haslo`
--

INSERT INTO `admin_haslo` (`haslo`) VALUES
('admin'),
('admin');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `kandydaci`
--

CREATE TABLE `kandydaci` (
  `id` int(11) NOT NULL,
  `kandydat` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Zrzut danych tabeli `kandydaci`
--

INSERT INTO `kandydaci` (`id`, `kandydat`) VALUES
(25, 'Ania'),
(26, 'kacperek'),
(27, 'antoni'),
(28, 'martyna');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `spis`
--

CREATE TABLE `spis` (
  `id` int(11) NOT NULL,
  `kandydat` text NOT NULL,
  `pesel_wyborcy` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Zrzut danych tabeli `spis`
--

INSERT INTO `spis` (`id`, `kandydat`, `pesel_wyborcy`) VALUES
(53, 'kacperek', '333'),
(54, 'kacperek', '33');

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `kandydaci`
--
ALTER TABLE `kandydaci`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `spis`
--
ALTER TABLE `spis`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT dla zrzuconych tabel
--

--
-- AUTO_INCREMENT dla tabeli `kandydaci`
--
ALTER TABLE `kandydaci`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT dla tabeli `spis`
--
ALTER TABLE `spis`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
