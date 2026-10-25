import { NextResponse } from "next/server";

export const revalidate = 3600; // revalidate every hour

export async function GET() {
  const token = process.env.GITHUB_TOKEN;
  const username = "Senthee1811";

  if (!token) {
    // Generate realistic contribution calendar matrix for Senthee1811
    return NextResponse.json({
      totalContributions: 642,
      weeks: generateFallbackCalendar(),
      isFallback: true,
    });
  }

  const query = `
    query($username: String!) {
      user(login: $username) {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
                date
                color
              }
            }
          }
        }
      }
    }
  `;

  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query, variables: { username } }),
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      throw new Error(`GitHub API responded with status ${res.status}`);
    }

    const data = await res.json();
    const calendar =
      data?.data?.user?.contributionsCollection?.contributionCalendar;

    if (!calendar) {
      throw new Error("No calendar data found");
    }

    return NextResponse.json({
      totalContributions: calendar.totalContributions,
      weeks: calendar.weeks,
      isFallback: false,
    });
  } catch (err) {
    console.warn("GitHub GraphQL fetch failed, using fallback:", err);
    return NextResponse.json({
      totalContributions: 642,
      weeks: generateFallbackCalendar(),
      isFallback: true,
    });
  }
}

function generateFallbackCalendar() {
  const weeks = [];
  const now = new Date();
  for (let w = 52; w >= 0; w--) {
    const days = [];
    for (let d = 0; d < 7; d++) {
      const date = new Date(now);
      date.setDate(date.getDate() - (w * 7 + (6 - d)));
      // Realistic distribution of commits
      const rand = Math.random();
      const count =
        rand > 0.7 ? Math.floor(Math.random() * 6) + 1 : rand > 0.4 ? 1 : 0;
      days.push({
        contributionCount: count,
        date: date.toISOString().split("T")[0],
      });
    }
    weeks.push({ contributionDays: days });
  }
  return weeks;
}
