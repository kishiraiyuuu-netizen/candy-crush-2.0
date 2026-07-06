# Candy Crush 2.0

A modern, interactive version of the classic Candy Crush game built with vanilla JavaScript, HTML, and CSS.

## 🎮 Features

- **8x8 Game Board**: Classic grid-based gameplay
- **6 Candy Types**: Different colored candies to match (🍎 🍊 🍋 🍌 🍉 🍇)
- **Match-3 Mechanics**: Swap adjacent candies to create matches of 3 or more
- **Cascade System**: Matched candies disappear, and new candies fall to fill gaps
- **Scoring System**: Earn points for each match
- **Progressive Levels**: Level up as you reach target scores
- **Move Limit**: 20 moves per game with level progression
- **Smooth Animations**: Beautiful transitions and visual feedback
- **Responsive Design**: Works on desktop and mobile devices
- **Game States**: Pause, resume, and restart functionality

## 🎯 How to Play

1. **Goal**: Create matches of 3 or more candies of the same type
2. **Swap**: Click on a candy, then click on an adjacent candy to swap them
3. **Match**: If the swap creates a line of 3+ matching candies, they will be removed
4. **Chain**: When candies are removed, candies above fall down and fill the gaps, potentially creating new matches (cascades)
5. **Score**: Each match grants 10 points per candy matched
6. **Moves**: You have 20 moves per level. Use them wisely!
7. **Level Up**: Reach the target score (starts at 1,000) to advance to the next level

## 🕹️ Controls

- **Click on Candy + Adjacent Candy**: Swap two candies
- **New Game Button**: Start a fresh game
- **Pause Button**: Pause/Resume gameplay
- **Reset Button**: Reset the current game
- **Play Again Button**: After game over, start a new game

## 📊 Game Statistics

- **Score**: Total points earned
- **Moves**: Remaining moves in current level
- **Level**: Current game level

## 🎨 Visual Design

- Gradient backgrounds with modern UI
- Candy emojis for visual appeal
- Smooth hover and selection effects
- Animated game over modal
- Mobile-responsive layout

## 📝 Code Structure

- **index.html**: Game UI and layout
- **styles.css**: Complete styling and responsive design
- **game.js**: Game logic and mechanics
  - `CandyCrush` class: Main game controller
  - Board generation and management
  - Match detection and removal
  - Gravity and cascade system
  - Event handling and rendering

## 🚀 Getting Started

1. Clone or download this repository
2. Open `index.html` in a modern web browser
3. Start playing!

## 🎓 Game Progression

- **Level 1**: Score target 1,000 with 20 moves
- **Level 2**: Score target 2,000 with 30 moves
- **Level 3+**: Each level adds 1,000 to target and 10 more moves

## 💡 Tips & Strategies

- Plan your moves ahead
- Look for cascade opportunities
- Prioritize matches that create chain reactions
- Focus on corners and edges for better control
- Save moves for critical situations

## 🛠️ Technical Details

- **Framework**: Vanilla JavaScript (No dependencies)
- **Browser Compatibility**: Modern browsers (Chrome, Firefox, Safari, Edge)
- **Performance**: Optimized for smooth gameplay
- **Responsive**: Scales to different screen sizes

## 🎮 Future Enhancements

- Power-ups (bombs, lightning, etc.)
- Obstacles and special tiles
- Sound effects and music
- Local high score storage
- Multiplayer mode
- Difficulty settings
- Special match bonuses (4+ matches, L-shapes, T-shapes)

## 📜 License

Free to use and modify!

---

**Enjoy playing Candy Crush 2.0!** 🍬🎉