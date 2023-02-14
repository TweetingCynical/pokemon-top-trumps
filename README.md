# Pokemon Top Trumps

## A simple Pokemon Top Trumps game app which allows users to pit themselves against the CPU, using JavaScript, jQuery and CSS to interact with the html elements on the page

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
        <li><a href="#about-the-project">About The Project</a></li>
        <li><a href="#deployment">Deployment / Code Repository</a></li>
        <li><a href="#screenshot">Screenshot</a></li>
        <li><a href="#scope-and-purpose">Scope and Purpose</a></li>
        <li><a href="#usage">Usage</a></li>
        <li><a href="#credits">Credits</a></li>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#pseudocode">Pseudocode</a></li>
        <li><a href="#overview-of-build">Overview of Build</a></li>
        <li><a href="#suggested-future-changes">Suggested Future Changes</a></li>
        <li><a href="#license">License</a></li>
      </ol>
</details>

<!-- About the Project -->

## About the Project

### Deployment / Code Repository

[Live deployment](https://tweetingcynical.github.io/pokemon-top-trumps/)

[Repository](https://github.com/TweetingCynical/pokemon-top-trumps)

### Screenshot

Working version of site should look like this at standard screen size:
![Site Screenshot](./assets/screenshot.png)

### Scope and Purpose

Build an interactive game app which collects Pokeman character data using the pokeapi, and gives both the user and cpu five cards with which to play. The user selects a category on their own card, and if their category has a better score than their opponent, they win the card.

### Usage

This site and its codeset are for educational purposes only.

### Credits

The following people have all contributed to this app:

- [maclauren](https://github.com/maclauren)
- [Saadu10002](https://github.com/Saadu10002)
- [TweetingCyncical](https://github.com/TweetingCynical)

### Installation

N/A

<!-- Pseudocode and overview of build -->

## Pseudocode

Steps to achieving the working Pokemon Top Trumps App:

## Overview of Build

Some of the key JavaScript skills being utilised:

### Suggested future changes

- ✅ ~~Refactor the randomOption function to that we can use it for two purposes (multiple random numbers for selecting Pokemon characters, and one single random number with set limits for displaying a different Giphy)~~
- ✅ ~~Display card name in upper case, or capitalise~~
- Add screen shots to instructions modal
- Add glow effects to the buttons
- ✅ ~~Add animation effect to the cards so they appear to flip over~~
- Advanced: Display all five user cards in a row, so they can choose which card to play, and then remove that card from their available row once played. This will require choosing cards out of sync, so the logic would need to take into account a different index sequence
- Advanced: Display screen which shows who each card belongs to at the end of the game. This could be acheived by pushing the array index of each card into a new array titled cards won, cards lost.

## License

MIT License

Copyright (c) 2022 TweetingCynical

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
