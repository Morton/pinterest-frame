import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { MersenneTwister19937, Random } from "random-js";
import { useEffect } from "react";

function getSeedString(query: GetServerSidePropsContext['query']) {
  const span = query?.span as string
  switch (span?.toLowerCase()) {
    case 'day':
      return new Date().toISOString().split('T')[0].replaceAll(/[-]/g, '')
    case 'hour':
    default:
      return new Date().toISOString().split(':')[0].replaceAll(/[T-]/g, '')
  }
}
function getSeed(query: GetServerSidePropsContext['query']) {
  const seedString = getSeedString(query)
  console.log('Seed string:', seedString)

  const seed = Number(seedString);
  console.log('Seed:', seed);

  return seed;
}

export async function getServerSideProps({ query }: GetServerSidePropsContext) {
  const random = new Random(
    MersenneTwister19937.seed(getSeed(query))
  );

  const url = 'https://www.pinterest.de/resource/BoardFeedResource/get?source_url=%2Fm1841%2Fmotivation%2F&data=%7B%22options%22%3A%7B%22board_id%22%3A%22521784375517072934%22%2C%22board_url%22%3A%22%2Fm1841%2Fmotivation%2F%22%2C%22currentFilter%22%3A-1%2C%22field_set_key%22%3A%22react_grid_pin%22%2C%22filter_section_pins%22%3Atrue%2C%22sort%22%3A%22default%22%2C%22layout%22%3A%22default%22%2C%22page_size%22%3A25%2C%22redux_normalize_feed%22%3Atrue%7D%2C%22context%22%3A%7B%7D%7D&_=1727011375161';
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json, text/javascript, */*, q=0.01',
      'accept-language': 'en-US,en;q=0.9,de;q=0.8',
      'cache-control': 'no-cache',
      cookie: 'cm_sub=denied; _auth=1; _pinterest_sess=TWc9PSZ2VTNXOXExZmdFTnRsbUN1TmR4MFY0Yk9UVDE0ejVoOGliSFRhczBUbXVyVkpndUsrd3ZMMUM4b015cjNXZWJXVDdlMWV1SUd3bHpsaGhxY21wVGYwZ0hxcjRGVWcrNlR0emNvcXh6Nk9tZHFBREdGeWY4V1FaTjNYNHNCSjVoMFMwVmxldWYrZEozLzBzTmdXVjY3SmVCZysxZjFmYndjcmNjUU9uV1dOTjFNdGJlR2tKSmRXL2FiUENjZkpGVVYzWXZhVG84YWFQTXY5T1YydjhDTkZqOGxuVUdmNmhKcjZlWkltYm5JbjlpcUFkVUxEa3dwWEQ5NUl0OHpqNGRhWUNwamJCbkRhU283NjMvbWlVeFQwTmgxYzJjeUZQcit1NTZ6M1l5d1Q0dldHL280K0M2N1FlR1B1K2taMEpudkxMdFJUdzNleXV2NlpoK0VjeENTV2JNZkd0TlFNSGR2VWtGTzdHMml2Y015OWdpSHZ4dU1JaVc2aitZY2ltZlNTZGVBSXI5OFFNQ1EvcXYwdHhRck1JYXBtUjJsTEVlemFkRGlKZkFaS2x0TTROWFBKNnRjNEMxZ2pIVFJWZkM3MnNEMS85YU1JNmxBVThWajJxM0J1YVJyakpUYzlyYnY1R0dkbFNLYlpzVXNJQjloSjR5L2tSUjZLZWNSU3gzQ0pkS1VDSnA1YU9JaEVTNTFMTWNyTkRXMU05MzVlVEhUdU1qWlZhOEt0eGhndU0vSVh4VksvalIvZW45TGNCL1lWTGh6djlxcFlsT3lnOWFHNVlWTi9COGJieWU0MExCa2xBMlZJWFRyVkZrN1RvK1dNT3g5Q2tyakIzMEJFbVFYdGlTL3A1bUU5dUtFdWJYd1pnSzVGZ3BLU01oTTlzNmUrY3B2V0RPekc0dHNKb3htb1F4bE8weTd6SDZOaXNWNVlUZE5jYTZiQ2YyWUlUMmRTby9WNW1LQjJVQi8xU0dBV1lpeDRsLy9sWU1IY1UyK0NkZVFpQmd3QjVUQ0djT1ViYy9pL3V4eks1bUR3U0VFUTg2YU9uZzE4QVVVdm96a1RpMTNVQVBzVTFlUWRWTVFMOHlWKzlXbDVOYW5DSnJHMEFHVlNaSlROdlRqejVUUGVYcEUzUWdpTjVXNTIrTTBsL20xOGloZ2VZMGsvS2wrYlU3aDREemZEVlZxZ082V2ZHRzB5WHh4aXVkc29PYzFTNTlrRlk1ZGRnV3NnSFJ3VzZ0Y2NxWGQ0bS9mVExES2s2eGx2OHU3VEZYMFJ6VUwrSWZOZGFXTHNCYysrQ2RwWmhmZXIwcWJObDhidGh3VVVlUi9kQ3BIb2llR0h5U2k5OGNwc3NWZ2djSFlvbjc4bjA0azhxeVh5d2NoVWhiaTJHbmdzb21BZ2NqdkYxbnJOeFZZV0o2MUJ1Z2pOMUlBaHkxblNBa2oxcWlSaGYzQStONWx6N1lDTkZXcnprOVNhdGV6VVRwYnhyMmhQb0gxQzk0U3B1SUQ3R2lna0FmcFdPZ3pUQ0VnRml6RmZNb1NWVEdGcmpNaFZRRTJWNXdneGRlK2g1NEdKQmUrVjM1Zk95QkhqZ0FCS3RQbm8yTW1sMjF2bjVYTjExU29FK3BCWXhyNzBuSEJQTkRlb0NTOEY2aWM1Z1NpeTM3YWx6RWY2ZlB2RjlseC9idFF6cDNWd0FWZTNISC9qNElGTmJBeHlsdUxYUW1BMFQrUDY1c3BSNjJ1YUpmd3ZhVFBaS0hWbW0rZFc3YVFiSDdtSmJRd25Tb1d4aWlabzhpOUQ0VDgmc0wxRlNZOWM5ZWZUQTZjdTFnQjJhVHozVTFBPQ==; __Secure-s_a=UmtXR2N5ZjhJRm9Lbk9wOFNHTTlKUSszRkl4YUxOblc4UWxnMkd5STI1KzZqWjArV2JLZFZrZEM5STA3Rjc1RndDM1lOazlYcXFXU29Oa0dQQjJFdFJKdTNidGxKT1JsS1pvNlE2cUQ0ZmZtN3Uza1JaTUE1ajZwUHlvQnB2azV1WnAvQUs1aHoyS2c2ZkhNbFlyN2xwRzlGOXpoNmxxOC84QnRpOGdCZzNFbXlvdnBNdWpzYXQveDlROVlGV1c2UThiVkhIbXkyZHJmdXZ2TmlnQkQ0aUQwdTQ1bU9uRVR3VkJmNUlSVFI0TERrLy9Sa0NRc25xNU9nWVlhSWlpbllqRnY3YXBhaitvNkhXYjFRYjdPNHlJTkJMY2t0YXRGakhDWEdpRXd5eEw5L1FLSXVSS1VzZ1dON3VFZU1NUFF5UENWSWZkSVErWkVJQlpBd0FqaUJGZVhWQU1hWWJvQTlrdVVtT3pZNmw4SU9kSSthNGkvc25hR1BDUjNWOHdjQTdhQ1RQSGdNcUtHQnJMS29mOFAwbmxZNmd3dXpuKzFKQ2xjRFRKQTd4S0swMnhVZFF6ZnMxVEVVb09qaUh2RWxic2lNTUlPcVN4cnpSVUZobVh6U2tod1ZQVXpZeUxMazZmdDkzMWpEeFQrMFVoVHc0QTFmR1BXQmtTenZzWHg3c25GT3p4VFlOUFNiUU1YeXIra1V0RVltUk0wMHBsMDk3b2hzd3lFdkVoZkVNa0FZY1puZXliQ3FWRzRtRWpVMFhOenRobDdNbWhwM0M5WW1DYnI0T3NrZkMxamNDYXdvekd4eWUyQ2gvdmVNVnN5eGl5NS96eHU2NVVnN3QwdUx1cVhwVmgrcGVuaW05WTQ0OS85QkFpcXZ2dXZ1TzRxbTJTNDF5ZEhQVk8wTFpMSzRZLzMzbklWcFo5N2VEM1FBdzZhWnFmVE5mdCtpeW5KcnhOY3h3QVp6SUFYc3ZTNjR0UEYyVnMrb1p5clVLQUc5T1BpUy9CY2pGOTJhMzBFbkpuR25nbU5KZU1kVlZDdVJLZmtUWHhKdExTQSthemdnNzJjTzFzdUxVZ0l3Vm5wQ1FJMVlaNEtla1pVcmFJSzh1L21ZUU96ZENaVUtyVGdhMHk2Z0VobHVTckdVVnVuMkc3c0NDdXVRdzFnZjJWczJlV1hma29wVmtyUlcrbGQ1Z090WjJ0NHM5MTVSOGp0dStrRXluTTRPT0JuVlV1MTJnUjRjeUUzN2lDL2FrbmQxaFlRN1BEZ2wwY0dBZ3FyYnZxaGpPS05WT01LL3VTanlxOUJNMzhib2JmdmNzb2UrdjZWUVNDczhDWT0mcGdrbHVPaWpkUU5yK3FhbkkrajFDbzZSZmhZPQ==; csrftoken=f1c5919be596526a77cf56774bd28d05; _routing_id="74c316ac-d96a-44fa-92bd-17a3f2775078"',
      pragma: 'no-cache',
      priority: 'u=1, i',
      referer: 'https://www.pinterest.de/',
      'sec-ch-ua': '"Chromium";v="128", "Not;A=Brand";v="24", "Google Chrome";v="128"',
      'sec-ch-ua-full-version-list': '"Chromium";v="128.0.6613.85", "Not;A=Brand";v="24.0.0.0", "Google Chrome";v="128.0.6613.85"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-model': '""',
      'sec-ch-ua-platform': '"macOS"',
      'sec-ch-ua-platform-version': '"14.6.1"',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'same-origin',
      'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
      'x-app-version': '751b71d',
      'x-pinterest-appstate': 'active',
      'x-pinterest-pws-handler': 'www/[username]/[slug].js',
      'x-pinterest-source-url': '/m1841/motivation/',
      'x-requested-with': 'XMLHttpRequest'
    }
  };

  const res = await fetch(url, options)
  const data = await res.json()

  const index = random.integer(0, data.resource_response.data.length - 1);

  const color = query?.background ?? data.resource_response.data[index].dominant_color;

  const image = {
    url: data.resource_response.data[index].images.orig.url,
    color
  };

  return { props: { image } };
}

export default function Home({ image }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  useEffect(() => {
    setTimeout(() => {
      window.location.reload();
    }, 60 * 60 * 1000);
  })

  return (
    <div
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        top: 0,
        left: 0,
        backgroundImage: `url(${image.url})`,
        backgroundPosition: "center",
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundColor: image.color,
      }}
    />
  );
}
