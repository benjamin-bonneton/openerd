# Openerd

> Plateforme de gestion et visualisation de cours, développée avec React, TypeScript et Vite.

## Fonctionnalités principales

- Affichage d'une liste de cours à partir d'un fichier JSON
- Visualisation des détails d'un cours
- Système de badges et de niveaux de sévérité
- Navigation entre les pages (React Router)
- Effets visuels (confettis)
- Design moderne avec Tailwind CSS

## Structure du projet

```
src/
	App.tsx                // Composant principal
	main.tsx               // Point d'entrée
	assets/                // Fichiers statiques (images, polices, json, styles)
	components/            // Composants réutilisables
		BadgesBar.tsx
		Button.tsx
		Divider.tsx
		courses/
			CourseCard.tsx
			CoursesList.tsx
	hooks/                 // Hooks personnalisés
		courses.ts
	pages/                 // Pages principales
		Course.tsx
		Courses.tsx
	services/              // Services (API, etc.)
	types/                 // Types TypeScript
		Button.ts
		course.ts
		severities.ts
	utils/                 // Fonctions utilitaires
		confetti.ts
		severities.ts
```

## Installation

1. **Cloner le dépôt**
   ```bash
   git clone <url-du-repo>
   cd openerd
   ```
2. **Installer les dépendances**
   ```bash
   npm install
   ```
3. **Lancer le serveur de développement**
   ```bash
   npm run dev
   ```

## Build & Production

Pour générer la version de production :

```bash
npm run build
```

Pour prévisualiser la build :

```bash
npm run preview
```

## Technologies utilisées

- [React](https://react.dev/) 19
- [TypeScript](https://www.typescriptlang.org/) 5
- [Vite](https://vitejs.dev/) 7
- [Tailwind CSS](https://tailwindcss.com/) 4
- [Axios](https://axios-http.com/) pour les requêtes HTTP
- [React Router DOM](https://reactrouter.com/) 7
- [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti)

## Licence et Contribution

Ce projet est sous licence MIT. Les contributions sont les bienvenues ! Pour proposer une amélioration, ouvrez une issue ou une pull request.

## Auteur

Benjamin — 2025
