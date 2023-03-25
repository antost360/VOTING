-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Czas generowania: 25 Mar 2023, 11:38
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
('haslo'),
('haslo');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `kandydaci`
--

CREATE TABLE `kandydaci` (
  `id` int(11) NOT NULL,
  `kandydat` text NOT NULL,
  `liczba_glosow` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Zrzut danych tabeli `kandydaci`
--

INSERT INTO `kandydaci` (`id`, `kandydat`, `liczba_glosow`) VALUES
(57, 'Antoni Ostrowski', 1),
(58, 'Kacper Duda Trzaskowski', 1),
(61, 'Dariusz Kowalski', 2);

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
(139, 'Antoni Ostrowski', '15136316316'),
(140, 'Kacper Duda Trzaskowski', '62424664264'),
(141, 'Dariusz Kowalski', '39075935639'),
(142, 'Dariusz Kowalski', '83656356853');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;

--
-- AUTO_INCREMENT dla tabeli `spis`
--
ALTER TABLE `spis`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=143;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
