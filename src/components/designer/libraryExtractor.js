import { nanoid } from "nanoid";
// export const oldLibraryExtractor = (data) => {
//   if (!data) {
//     return [];
//   } else {
//     const groupIcons = [];
//     const uniqueGroupNames = [];
//     const uniqueSectionNames = [];

//     data.forEach((icon) => {
//       if (uniqueGroupNames.includes(icon.group)) {
//         const targetObjIngroupIconsArr = groupIcons.find(
//           (g) => g.groupTitle === icon.group
//         );
//         targetObjIngroupIconsArr.iconsArr.push({
//           iconId: nanoid(),
//           fileName: icon.link,
//           iconsTitle: icon.title,
//         });
//       } else {
//         groupIcons.push({
//           id: nanoid(),
//           groupTitle: icon.group,
//           iconsArr: [
//             {
//               iconId: nanoid(),
//               fileName: icon.fileName,
//               iconsTitle: icon.title,
//             },
//           ],
//         });

//         uniqueGroupNames.push(icon.group);
//       }
//     });

//     console.log("xxx groupIcons", JSON.stringify(groupIcons, null, 2));

//     return groupIcons;
//   }
// };
export const libraryExtractor = (data) => {
  if (!data) {
    return [];
  } else {
    const sections = [];
    const uniqueSectionNames = [];

    data.forEach((icon) => {
      if (!uniqueSectionNames.includes(icon.section)) {
        uniqueSectionNames.push(icon.section);
        sections.push({
          id: nanoid(),
          sectionTitle: icon.section,
          groups: [],
        });
      }

      const targetSection = sections.find(
        (section) => section.sectionTitle === icon.section
      );

      if (
        !targetSection.groups.some((group) => group.groupTitle === icon.group)
      ) {
        targetSection.groups.push({
          id: nanoid(),
          groupTitle: icon.group,
          iconsArr: [],
        });
      }

      const targetGroup = targetSection.groups.find(
        (group) => group.groupTitle === icon.group
      );

      targetGroup.iconsArr.push({
        iconId: nanoid(),
        fileName: icon.link,
        // iconsTitle: `${icon.description} ${icon.id ? icon.id : ""}`,
        iconsTitle: icon.description,
        id: icon.id,
      });
    });

    return sections;
  }
};
