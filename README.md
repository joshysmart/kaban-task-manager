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

I honed my Next.js skills, particularly by delving into server components. Used react hook form for improved extensibility, usability, and performance in managing forms The backend API was written with express, authenticated using clerk and hosted separately, facilitating access to board data for both the public and logged-in users. To enable drag-and-drop functionality, React DnD was implemented, although without animations. Additionally, I employed the onClickOutside hook to handle clicks outside specific areas. There is an intermittent bug related to Clerk that occasionally appears, but for the time being, a quick refresh resolves the issue. I'm still working on a permanent solution for this."

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
