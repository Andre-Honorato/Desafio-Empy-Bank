-- CreateTable
CREATE TABLE `assistente_comercial` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(100) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `telefone` VARCHAR(20) NOT NULL,

    UNIQUE INDEX `assistente_comercial_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cliente` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `codigo` VARCHAR(50) NOT NULL,
    `nome` VARCHAR(100) NOT NULL,
    `rede` VARCHAR(50) NOT NULL,
    `idAssistente` INTEGER NULL,

    UNIQUE INDEX `cliente_codigo_key`(`codigo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `cliente` ADD CONSTRAINT `cliente_idAssistente_fkey` FOREIGN KEY (`idAssistente`) REFERENCES `assistente_comercial`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

INSERT INTO `assistente_comercial` (`nome`, `email`, `telefone`) VALUES 
('João Silva', 'joao.silva@example.com', '123456789'),
('Maria Oliveira', 'maria.oliveira@example.com', '987654321'),
('Carlos Pereira', 'carlos.pereira@example.com', '555555555');

INSERT INTO `cliente` (`codigo`, `nome`, `rede`, `idAssistente`) VALUES 
('C001', 'Cliente A', 'Rede A', 1),
('C002', 'Cliente B', 'Rede B', 1),
('C003', 'Cliente C', 'Rede C', 2),
('C004', 'Cliente D', 'Rede D', NULL),
('C005', 'Cliente E', 'Rede E', NULL);