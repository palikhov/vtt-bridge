import * as classes from "../classes";
import * as commands from "../commands";

import { createButton, withTopMargin } from "../elements";

import { onElementLoad } from "../../common";

/**
 * Add cast buttons for cantrips.
 *
 * @param {Function} onClick
 */
export const addCastCantripButtons = (onClick) =>
  onElementLoad(".spells tr td div.opacity-5", () => ready(onClick));

const ready = (onClick) => {
  const divs = document
    .querySelector(".spells")
    .querySelectorAll("div.opacity-5");
  for (const div of divs) {
    if (div.innerText.toLowerCase().includes("cantrip")) {
      const row = div.closest("tr");
      const cell = div.closest("td");

      if (cell.querySelector("." + classes.castCantrip)) {
        // The button for this cantrip already exists.
        continue;
      }

      // These selectors are quite brittle, but we can't do much better.
      const cantrip = row.previousSibling.querySelector("td").innerText;
      const details = cell.querySelector("p").parentElement.innerText;

      const button = createButton(
        "cast cantrip on roll20",
        function () {
          onClick(commands.castSpell(cantrip, details));
        },
        [classes.castCantrip]
      );

      // Match the classes of the "cast spell" buttons.
      const wrapper = document.createElement("div");
      wrapper.classList.add(
        "flex",
        "justify-cont-end",
        "align-items-c",
        withTopMargin()
      );
      wrapper.appendChild(button);
      cell.prepend(wrapper);

      console.debug("Created cast cantrip button");
    }
  }
};