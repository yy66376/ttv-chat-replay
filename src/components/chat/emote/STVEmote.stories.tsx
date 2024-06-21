import type { Meta, StoryObj } from "@storybook/react";
import { http, HttpResponse } from "msw";
import STVEmote from "./STVEmote.component";
import { within, userEvent, expect } from "@storybook/test";

const meta: Meta<typeof STVEmote> = {
  tags: ["autodocs"],
  component: STVEmote,
  title: "Chat/Emote/7TV Emote",
};

export default meta;
type Story = StoryObj<typeof STVEmote>;

const pixelDensities = [];
for (let pixel = 1; pixel <= 4; pixel++) {
  for (const ext of ["webp", "avif"]) {
    pixelDensities.push(`${pixel}x.${ext}`);
  }
}

export const Default: Story = {
  args: {
    emote: {
      id: "6355fe11de3881480c2cc048",
      name: "Stare",
      flags: 0,
      timestamp: 1714922282375,
      actor_id: "60ae434b5d3fdae58382926a",
      data: {
        id: "6355fe11de3881480c2cc048",
        name: "Stare",
        flags: 0,
        lifecycle: 3,
        listed: true,
        animated: false,
        owner: {
          id: "60afa8c899923bbe7f6e5a33",
          username: "trippycolour",
          display_name: "TrippyColour",
          avatar_url:
            "//cdn.7tv.app/user/60afa8c899923bbe7f6e5a33/av_66282b3deb5aa7e8f52891e9/3x.webp",
          style: {
            color: -5635841,
          },
          roles: ["6076a86b09a4c63a38ebe801", "62b48deb791a15a25c2a0354"],
        },
        host: {
          url: "//cdn.7tv.app/emote/6355fe11de3881480c2cc048",
          files: [
            {
              name: "1x.avif",
              static_name: "1x_static.avif",
              width: 37,
              height: 32,
              frame_count: 1,
              size: 1567,
              format: "AVIF",
            },
            {
              name: "1x.webp",
              static_name: "1x_static.webp",
              width: 37,
              height: 32,
              frame_count: 1,
              size: 1758,
              format: "WEBP",
            },
            {
              name: "2x.avif",
              static_name: "2x_static.avif",
              width: 74,
              height: 64,
              frame_count: 1,
              size: 3068,
              format: "AVIF",
            },
            {
              name: "2x.webp",
              static_name: "2x_static.webp",
              width: 74,
              height: 64,
              frame_count: 1,
              size: 4110,
              format: "WEBP",
            },
            {
              name: "3x.avif",
              static_name: "3x_static.avif",
              width: 111,
              height: 96,
              frame_count: 1,
              size: 4581,
              format: "AVIF",
            },
            {
              name: "3x.webp",
              static_name: "3x_static.webp",
              width: 111,
              height: 96,
              frame_count: 1,
              size: 6786,
              format: "WEBP",
            },
            {
              name: "4x.avif",
              static_name: "4x_static.avif",
              width: 148,
              height: 128,
              frame_count: 1,
              size: 6178,
              format: "AVIF",
            },
            {
              name: "4x.webp",
              static_name: "4x_static.webp",
              width: 148,
              height: 128,
              frame_count: 1,
              size: 9802,
              format: "WEBP",
            },
          ],
        },
      },
    },
  },
  parameters: {
    msw: {
      // handlers: pixelDensities.map((pixelDensity) => {
      //   return http.get(
      //     `https://cdn.7tv.app/emote/6355fe11de3881480c2cc048/${pixelDensity}`,
      //     async () => {
      //       const buffer = await fetch(
      //         `/static/emotes/6355fe11de3881480c2cc048_${pixelDensity}`
      //       ).then((response) => response.arrayBuffer());

      //       return HttpResponse.arrayBuffer(buffer, {
      //         headers: {
      //           "Content-Type": `image/avif`,
      //         },
      //       });
      //     }
      //   );
      // }),
      handlers: [
        http.get(
          `https://cdn.7tv.app/emote/6355fe11de3881480c2cc048/1x.avif`,
          async () => {
            const buffer = await fetch(
              `/emotes/6355fe11de3881480c2cc048_1x.avif`
            ).then((response) => response.arrayBuffer());

            return HttpResponse.arrayBuffer(buffer, {
              headers: {
                "Content-Type": `image/avif`,
              },
            });
          }
        ),
        http.get(
          `https://cdn.7tv.app/emote/6355fe11de3881480c2cc048/4x.avif`,
          async () => {
            const buffer = await fetch(
              `/emotes/6355fe11de3881480c2cc048_4x.avif`
            ).then((response) => response.arrayBuffer());

            return HttpResponse.arrayBuffer(buffer, {
              headers: {
                "Content-Type": `image/avif`,
              },
            });
          }
        ),
      ],
    },
  },
};

export const Hovered: Story = {
  args: {
    ...Default.args,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement.ownerDocument.body);

    await userEvent.hover(canvas.getByRole("img"));

    expect(canvas.getByRole("tooltip")).toBeInTheDocument();
  },
};
