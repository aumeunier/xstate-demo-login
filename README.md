# XState demo, using Login


This repository is all about demoing the features of State Machines in Frontend code. It uses XState library and React, but could be using other libraries as well.

The code is organized to be discovered in several steps:

- in "step1", the aim is to explore the differences between a standard way (state) and a Machine state way of declaring things. A very basic state machine is presented

- in step2, we add some usage for the context. The machine also adds some services and an invoke step.

- in step3, we add a React.Context Provider, we organize the code, and add a second machine.

It is highly suggested to dig into the XState documentation on the side as well.


## Installation & libraries

* This project was created with [create-react-app Typescript template](https://create-react-app.dev/docs/adding-typescript/)

* I use the [XState library](xstate.js.org/) for the State Machines

  * XState is a pure Javascript & Typescript library, but you can use it in React. The `@xstate/react` library provides hooks utilities for React that are a very nice addition

This project uses Yarn as package manager. To get started on this project, run locally: `yarn`

To start the project: `yarn start`. This should start the app and open a window on `localhost:3000`.

### Tests

You can run tests with `yarn test`.

## Notes

There is a bug in the AuthMachine that is left on purpose! If you want to dig it, you can take a look at the commented test.

### Out of scope


As this repository is a demo focused on State Machines with XState, there are elements that are out of scope. Quick overview of these elements:


- In order to get some basic UI, I used [TailwindCSS](tailwindcss.com/). Installation steps can be followed [here](https://tailwindcss.com/docs/guides/create-react-app)


