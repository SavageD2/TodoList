To-Do List avec React et TypeScript
Ce projet consiste à créer une application To-Do List en React avec TypeScript, en suivant une approche modulaire où les fonctionnalités sont séparées en plusieurs composants. Nous avons utilisé des données statiques pour commencer, mais l'architecture est conçue pour être facilement évolutive, notamment pour intégrer une API plus tard.

1. Création de l'Application avec Vite
Nous avons utilisé Vite pour créer un projet React avec TypeScript. Vite est un outil de développement moderne qui offre un démarrage rapide et une expérience de développement fluide. Nous avons choisi TypeScript pour bénéficier d'une vérification statique des types et d'une meilleure organisation du code à long terme.

2. Structure du Projet
Le projet est organisé comme suit :
src/
  ├── components/
  │     ├── TodoForm.tsx
  │     ├── TodoItem.tsx
  │     └── TodoList.tsx
  ├── data/
  │     └── todos.ts
  ├── App.tsx
Composants créés :
# TodoItem : Affiche une tâche individuelle avec une case à cocher.
# TodoList : Affiche toutes les tâches dans une liste.
# TodoForm : Formulaire permettant à l'utilisateur d'ajouter une nouvelle tâche.
App : Composant principal qui gère l'état des tâches et intègre les autres composants.
3. Pourquoi Séparer en Composants ?
Nous avons choisi de diviser l'application en plusieurs composants pour plusieurs raisons :

Lisibilité : En séparant les fonctionnalités en composants, le code devient plus lisible et facile à maintenir.
Réutilisabilité : Chaque composant peut être réutilisé dans d'autres parties de l'application si nécessaire. Par exemple, le composant TodoItem peut être utilisé pour afficher une tâche n'importe où dans l'application.
Modularité : Si nous devons ajouter de nouvelles fonctionnalités à l'avenir, comme un filtrage des tâches ou un système de priorité, nous pourrons facilement ajouter de nouveaux composants sans perturber la structure existante.
4. Les Détails du Code

Pourquoi utiliser React.FC ?
Dans le fichier TodoItem.tsx, nous avons écrit :

# const TodoItem: React.FC<TodoItemProps> = ({ id, text, completed, toggleComplete }) => {
  // code du composant
};
# React.FC (ou React Function Component) est un type générique fourni par React qui permet de définir des composants fonctionnels en TypeScript. Il sert à spécifier que le composant est une fonction qui retourne du JSX, et il permet également de vérifier que les props du composant sont correctement typées.

Cela donne les avantages suivants :

Sécurité des types : TypeScript vérifie les types des props passées à TodoItem. Si nous essayons de passer des données de types incorrects, TypeScript générera une erreur de compilation.
# Autocomplétion et documentation : En utilisant React.FC, nous bénéficions de l'autocomplétion dans les IDE compatibles, et une meilleure lisibilité du code.
# Pourquoi import { todos as initialTodos } from './data/todos'; ?
Dans App.tsx, nous avons importé les tâches statiques avec cette ligne :

# import { todos as initialTodos } from './data/todos';
Cela nous permet d'importer les données des tâches depuis un fichier séparé (todos.ts), au lieu de les avoir directement dans App.tsx. Cela présente plusieurs avantages :

Organisation : Les données sont séparées du code du composant, ce qui rend le fichier App.tsx plus propre et facile à comprendre.
Modularité : Si nous devons changer la source des données (par exemple, passer d'un tableau statique à une API), cela peut être fait facilement dans le fichier todos.ts sans modifier la logique de App.tsx.
Clarté : Le nom initialTodos est plus descriptif que simplement todos, ce qui nous indique que ces tâches sont les valeurs initiales de l'état des tâches dans l'application.

Structure de App.tsx
Dans App.tsx, nous avons utilisé l'état useState pour gérer les tâches. Le code suit cette logique :

# const [todos, setTodos] = useState(initialTodos);
Cette ligne crée une variable d'état todos qui contient la liste des tâches. setTodos est une fonction utilisée pour mettre à jour l'état. L'idée est que nous commencerons avec des données statiques (initialTodos), mais nous pourrons facilement intégrer des données dynamiques lorsque l'API sera prête.

Nous avons également créé deux fonctions importantes :

# toggleComplete : Permet de marquer une tâche comme terminée ou non.
# addTodo : Permet d'ajouter une nouvelle tâche à la liste.
Ces fonctions sont passées aux composants enfants comme des props. Cela permet à TodoList de gérer l'affichage des tâches, et à TodoForm de permettre à l'utilisateur d'ajouter de nouvelles tâches.

Conclusion
En suivant cette approche modulaire, nous avons créé une To-Do List simple et évolutive avec React et TypeScript. Le choix d'utiliser des composants séparés et de gérer les données dans un fichier à part nous permet de maintenir facilement l'application et d'intégrer de nouvelles fonctionnalités, comme une API ou un système de filtrage, lorsque nous serons prêts.

La gestion de l'état avec useState nous permet de rendre l'application interactive. Enfin, en utilisant TypeScript, nous avons renforcé la qualité du code et amélioré l'autocomplétion et la sécurité des types tout au long du développement.

État filter : Nous avons ajouté un nouvel état filter pour garder trace du type de filtrage sélectionné. Cela peut être 'all', 'completed', ou 'incomplete'.

Composant Filter : Nous avons ajouté un composant Filter qui permet à l'utilisateur de choisir entre afficher toutes les tâches, uniquement celles terminées, ou uniquement celles non terminées.

Filtrage des tâches : Dans App.tsx, nous avons créé une constante filteredTodos qui est calculée en fonction de l'état du filtre. Si le filtre est 'completed', seules les tâches complètes sont affichées. Si le filtre est 'incomplete', seules les tâches non complètes sont affichées. Si le filtre est 'all', toutes les tâches sont affichées.

Interaction entre les composants : Le composant Filter reçoit filter et setFilter comme props. Lorsque l'utilisateur clique sur un bouton de filtre, le filtre est mis à jour, et les tâches affichées sont filtrées en conséquence dans TodoList.