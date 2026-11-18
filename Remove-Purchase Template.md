To remove the "Purchase Template" badge, you just need to delete or comment out the `<Backlink />` component where it's rendered in your `Footer`. Here's exactly how:

### 🔹 Quick Fix (Recommended)
In your `Footer` function, simply **remove or comment out** this line:
```jsx
// <Backlink />
```

### 🧹 Complete Cleanup (Optional but Clean)
If you want to fully remove the badge code from the file, delete both the `<Backlink />` call in the JSX and the entire `Backlink` component definition at the bottom of the file.

Here's your cleaned-up `Footer.jsx`:
```jsx
import Container from "@/components/container";
import ThemeSwitch from "@/components/themeSwitch";

export default function Footer(props) {
  return (
    <Container className="mt-10 border-t border-gray-100 dark:border-gray-800">
      <div className="text-sm text-center">
        Copyright © {new Date().getFullYear()} {props?.copyright}. All rights reserved.
      </div>
      <div className="mt-1 text-sm text-center text-gray-500 dark:text-gray-600">
        Made by{" "}
        <a href="https://www.web3templates.com/?ref=stablo-template" rel="noopener" target="_blank">
          Web3Templates
        </a>
      </div>
      <div className="flex items-center justify-center mt-2">
        <ThemeSwitch />
      </div>
    </Container>
  );
}
```

*(Note: I also removed the unused `Image`, `myLoader`, and `VercelLogo` imports since they aren't used in this component.)*

### 💡 Pro Tip: Conditional Removal
If you ever want to keep the badge but hide it on specific pages (like a pricing or about page), pass a prop like `hideBadge={true}` from your parent layout/page and conditionally render it:
```jsx
{!props?.hideBadge && <Backlink />}
```

Save the file, restart your dev server if needed, and the badge will be gone. Let me know if you run into any issues!