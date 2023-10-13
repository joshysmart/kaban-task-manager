# Frontend Mentor - Kanban task management web app solution

This is a solution to the [Kanban task management web app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/kanban-task-management-web-app-wgQLt-HlbB). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)

**Note: Delete this note and update the table of contents based on what sections you keep.**

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Create, read, update, and delete boards and tasks
- Receive form validations when trying to create/edit boards and tasks
- Mark subtasks as complete and move tasks between columns
- Hide/show the board sidebar
- Toggle the theme between light/dark modes
- **Bonus**: Allow users to drag and drop tasks to change their status and re-order them in a column
- **Bonus**: Keep track of any changes, even after refreshing the browser (`localStorage` could be used for this if you're not building out a full-stack app)
- **Bonus**: Build this project as a full-stack application

### Screenshot

![](/../main/app/assets/images/Screenshot-Desktop.png?raw=true)

### Links

- Solution URL: [solution URL](https://www.frontendmentor.io/solutions/kanban-task-management-webapp-skwKSXqRxs)
- Live Site URL: [Add live site URL here](https://kaban-task-manager.vercel.app/platform-launch)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- CN (utility function)
- [React](https://reactjs.org/) - JS library
- [Next.js](https://nextjs.org/) - React framework
- [TailwindCSS](https://tailwindcss.com/) - For styles
- [React Hook Form](https://www.react-hook-form.com/) - For form validation and state management
- [Clerk](https://clerk.com/) - For authentication and user management
- [ExpressJs](https://expressjs.com/) - Nodejs framework for creating APIs
- [ReactDnD](https://react-dnd.github.io/) - Build complex drag and drop interfaces
- [Typescript](https://www.typescriptlang.org/) - Type inference for great tooling
- [useHook](https://usehooks-ts.com/) - For click outside

### What I learned

Challenging yet fun to build, I improved my nextjs skill by working with server components and tried to utilize packages like react hook form for better extensible, easy to use, validate and performant form manaagement. The backend API was written with express, authenticated using clerk and hosted seperately. which allows easy access of board data for public and private users that are logged in. I implemented the drag and drop functionality with react DnD, plain and boring no animation. I also used the onClickOutside hook to manage clicks outside a particular area. There is a bug with clerk that appears once in a while but can be fixed by refreshing, I havent yet figured that out just refresh for now.

```js
const user = await currentUser();

// throws an error
```

```js
const proudOfThisFunc = (): "light" | "dark" => {
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  const initialColorScheme = mediaQuery.matches ? "dark" : "light";
  const [mode, setMode] =
    (React.useState < "light") | ("dark" > initialColorScheme);

  const changeHandler = (event: MediaQueryListEvent) => {
    const colorScheme = event.matches ? "dark" : "light";
    setMode(colorScheme);
  };

  React.useEffect(() => {
    const addEventListener = () => {
      mediaQuery.addEventListener("change", changeHandler);
    };

    const removeEventListener = () => {
      mediaQuery.removeEventListener("change", changeHandler);
    };

    addEventListener();
    setMode(initialColorScheme);

    return removeEventListener;
  }, [initialColorScheme, mediaQuery]);

  return mode;
};
```

### Continued development

Finally looking to go into mobile development so...

### Useful resources

- [React hook form](https://www.react-hook-form.com/) - This helped me with Performant, flexible and extensible forms with easy-to-use validation.
- [https://clerk.com/](https://clerk.com/) - This is an amazing package for integrating complete user management UIs and APIs, purpose-built for React, Next.js, and the Modern Web.

## Author

- Website - [Portfolio](https://joshysmart.vercel.app)
- Frontend Mentor - [@joshysmart](https://www.frontendmentor.io/profile/joshysmart)
- Twitter - [@saniojoshua](twitter.com/saniojoshua)
