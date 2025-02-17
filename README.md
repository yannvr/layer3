# **Layer3 Leaderboard – Test Assignment**  

The aim was to deliver a robust solution (unit test and UI test) while keeping the code simple and easy to read.

---

## **Setup (Bun-first)**  

- ```bun install ```
- ```bun run test ``` run all tests
- ```bun run dev ``` run the server
- ```bun run storybook``` open storybook


## Approach
Having an expressive semantic and modular code has driven my approach. The project stucture and name convention should make it obvious to review and maintain. Separation of concerns is reflected through the file strcuture and name convention.

## Stack considerations
- React with Vite is good choice for performance. Bun is also used for the same reason.
- Styled component enabled the use of meaningful component name so the LeaderBoard reads as the sum of it's underlying components
- Testing: 
  - Unit test is done via Jest. Some tests look for component essential features in rendering but snapshots tests are also used to provide a full coverage of the semantic.
  - Storybook is used for testing basic test cases and was used to test and style the UI without having to reload the app and refetch data
  - Raw LeaderBoard component is used to decouple rendering from data fetching and to enable UI testing
- Styling:
  - css vars are used for consistency when a color is used in multiple place
  - no framework was used to reduce any overhead (that is why tailwind was not used)
- Network layer:
  - data fetching operations are all handled in the leader board hook for clarity
  - a fallback is in place for layer3 endpoint

---

## Scope

- implementation of the test requirement including fetching the NFTs
- accessibility: links to layer3 user profile as well as NFT are included to enrich the UX (link to NFT not suitable for prod as we want to keep the user on the app)
- API considerations:
  - the layer3 endpoint has a CORS issue during implementation so a fallback has been provided but the request is still made for demonstration
  - OpenSea is used to fetch the user's NFT collection; The API key is included but on production, a dedicated endpoint would be used to hide the key
- UI:
  - NFT are visible on hovering the NFT icons
  - Top three users are highlighted

- **Layer3-Styled UI** – Matched the design as closely as possible.  
- **Clean, Modular Code** – Readable, structured, and not over-engineered.  
- **Performance** – Bun’s speed + Emotion’s runtime efficiency.  
- **Test Coverage** – Jest + React Testing Library for reliability.  

---

## 🛠 **Stack Choice & Why**  

- **Bun** – Because speed matters.  
- **React + TypeScript** – Component-driven and strongly typed.  
- **Emotion** – Clean styles, no tailwind clutter.  
- **Storybook** – Ensures the UI is solid before integration.  
- **Jest + RTL** – Testing where it actually counts.  
- **Etherscan API** – Fetches latest transactions.  
- **IPFS** – For user avatars & NFTs.  

---

## 🔍 **How I’d Improve This**  

Since this is a test assignment, I kept things **focused**—but if I had more time:  
- Add **better caching** for API calls to reduce redundant requests.  
- Expand **NFT handling** (e.g., show collections, floor prices).  
- Improve **mobile responsiveness** with finer UI tweaks.  

---

## 🤝 **Final Thoughts**  

This was fun to build—**fast, structured, and tested**. I prioritized a **clean architecture** while keeping it **practical**.  

Looking forward to your feedback! 🚀  
