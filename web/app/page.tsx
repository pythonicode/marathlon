import { DefaultLayout } from '@/components/layout/Layout'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import { Separator } from '@/components/ui/separator'
import Image from 'next/image'

function Strokes() {
  return <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
    width={800} height={400} fill="#ec4899" viewBox="0 0 300 100.000000"
    preserveAspectRatio="xMidYMid meet" className='hidden absolute -top-20 -left-40'>
    <g transform="tranneutral(0.000000,105.000000) scale(0.100000,-0.100000)" stroke="none">
      <path d="M2448 723 c7 -3 16 -2 19 1 4 3 -2 6 -13 5 -11 0 -14 -3 -6 -6z" />
      <path d="M2495 710 c3 -5 16 -10 28 -9 21 0 21 1 2 9 -28 12 -37 12 -30 0z" />
      <path d="M993 283 c15 -2 37 -2 50 0 12 2 0 4 -28 4 -27 0 -38 -2 -22 -4z" />
      <path d="M1083 283 c9 -2 25 -2 35 0 9 3 1 5 -18 5 -19 0 -27 -2 -17 -5z" />
      <path d="M1168 283 c7 -3 16 -2 19 1 4 3 -2 6 -13 5 -11 0 -14 -3 -6 -6z" />
    </g>
  </svg>
}

function SampleWeek() {
  return <Card className='hidden xl:block absolute -right-40 -top-32 z-20'>
    <CardHeader>
      <CardTitle>This Week</CardTitle>
      <CardDescription>August 20 to 27</CardDescription>
    </CardHeader>
    <CardContent>
      <div className='grid grid-cols-7 gap-2 items-end'>
        <HoverCard>
          <HoverCardTrigger>
            <div className='flex flex-col items-center gap-2 cursor-pointer'>
              <div className="w-4 h-20 rounded bg-pink-500" />
              <p className='text-xs text-neutral-500'>Sun</p>
            </div>
          </HoverCardTrigger>
          <HoverCardContent>
            <div className="flex items-center">
              <div className='w-2 h-2 bg-pink-500 rounded-full mr-2' />
              <h3 className='text-lg font-semibold'>
                Long Run
              </h3>
            </div>
            <Separator className='mb-2' />
            <p className='text-sm text-neutral-500'>
              50 minutes | Zone 2
              <br />
              20 minutes | Zone 3
              <br />
              10 minutes | Zone 1
            </p>
          </HoverCardContent>
        </HoverCard>
        <HoverCard>
          <HoverCardTrigger>
            <div className='flex flex-col items-center gap-2 cursor-pointer'>
              <div className="w-4 h-6 rounded bg-pink-300" />
              <p className='text-xs text-neutral-500'>Mon</p>
            </div>
          </HoverCardTrigger>
          <HoverCardContent>
            <div className="flex items-center">
              <div className='w-2 h-2 bg-pink-300 rounded-full mr-2' />
              <h3 className='text-lg font-semibold'>
                Recovery Run
              </h3>
            </div>
            <Separator className='mb-2' />
            <p className='text-sm text-neutral-500'>
              25 minutes | Zone 1 - Zone 2
            </p>
          </HoverCardContent>
        </HoverCard>
        <HoverCard>
          <HoverCardTrigger>
            <div className='flex flex-col items-center cursor-pointer'>
              <div className='w-4 h-6 rounded-t bg-neutral-700' />
              <div className="w-4 h-12 rounded-b bg-pink-600" />
              <p className='text-xs text-neutral-500 mt-2'>Tue</p>
            </div>
          </HoverCardTrigger>
          <HoverCardContent>
            <div className="flex items-center">
              <div className='w-2 h-2 bg-pink-600 rounded-full mr-2' />
              <h3 className='text-lg font-semibold'>
                Threshold Workout
              </h3>
            </div>
            <Separator className='mb-2' />
            <p className='text-sm text-neutral-500'>
              10 minutes | Zone 1
            </p>
            <div className='border border-neutral-200 dark:border-neutral-700 rounded p-2 my-2'>
              <p className='text-sm font-semibold mb-1'>Repeat x3</p>
              <p className='text-sm text-neutral-500'>1200m | Zone 4</p>
              <p className='text-sm text-neutral-500'>400m | Zone 2</p>
            </div>
            <p className='text-sm text-neutral-500'>
              10 minutes | Zone 1
            </p>
            <div className="flex items-center mt-4">
              <div className='w-2 h-2 bg-neutral-700 rounded-full mr-2' />
              <h3 className='text-lg font-semibold'>
                Strength Workout
              </h3>
            </div>
            <Separator className='mb-2' />
            <p className='text-sm text-neutral-500'>
              3x10 | Kettlebell Swings
              <br />
              5x5 | Box Jumps
              <br />
              5x5 | Deadlift
              <br />
              4x10 | Split Squat
            </p>
          </HoverCardContent>
        </HoverCard>
        <HoverCard>
          <HoverCardTrigger>
            <div className='flex flex-col items-center gap-2 cursor-pointer '>
              <div className="w-4 h-7 rounded bg-pink-300" />
              <p className='text-xs text-neutral-500'>Wed</p>
            </div>
          </HoverCardTrigger>
          <HoverCardContent>
            <div className="flex items-center">
              <div className='w-2 h-2 bg-pink-300 rounded-full mr-2' />
              <h3 className='text-lg font-semibold'>
                Recovery Run
              </h3>
            </div>
            <Separator className='mb-2' />
            <p className='text-sm text-neutral-500'>
              30 minutes | Zone 1 - Zone 2
            </p>
          </HoverCardContent>
        </HoverCard>
        <HoverCard>
          <HoverCardTrigger>
            <div className='flex flex-col items-center gap-2 cursor-pointer'>
              <div className="w-4 h-14 rounded bg-pink-400" />
              <p className='text-xs text-neutral-500'>Thu</p>
            </div>
          </HoverCardTrigger>
          <HoverCardContent>
            <div className="flex items-center">
              <div className='w-2 h-2 bg-pink-400 rounded-full mr-2' />
              <h3 className='text-lg font-semibold'>
                Endurance Run
              </h3>
            </div>
            <Separator className='mb-2' />
            <p className='text-sm text-neutral-500'>
              50 minutes | Zone 2
            </p>
          </HoverCardContent>
        </HoverCard>
        <HoverCard>
          <HoverCardTrigger>
            <div className='flex flex-col items-center gap-2 cursor-pointer'>
              <div className="w-4 h-4 rounded bg-neutral-700" />
              <p className='text-xs text-neutral-500'>Fri</p>
            </div>
          </HoverCardTrigger>
          <HoverCardContent>
            <div className="flex items-center">
              <div className='w-2 h-2 bg-neutral-700 rounded-full mr-2' />
              <h3 className='text-lg font-semibold'>
                Strength Workout
              </h3>
            </div>
            <Separator className='mb-2' />
            <p className='text-sm text-neutral-500'>
              3x10 | Kettlebell Swings
              <br />
              5x5 | Squat
              <br />
              2 minutes | Plank
            </p>
          </HoverCardContent>
        </HoverCard>

        <HoverCard>
          <HoverCardTrigger>
            <div className='flex flex-col items-center gap-2 cursor-pointer'>
              <div className="w-4 h-10 rounded bg-pink-400" />
              <p className='text-xs text-neutral-500'>Sat</p>
            </div>
          </HoverCardTrigger>
          <HoverCardContent>
            <div className="flex items-center">
              <div className='w-2 h-2 bg-pink-400 rounded-full mr-2' />
              <h3 className='text-lg font-semibold'>
                Endurance Run
              </h3>
            </div>
            <Separator className='mb-2' />
            <p className='text-sm text-neutral-500'>
              40 minutes | Zone 2
            </p>
          </HoverCardContent>
        </HoverCard>
      </div>
    </CardContent>
  </Card>
}

function SampleTraining() {
  return <Card className='hidden xl:block absolute -z-20 -left-48 -bottom-20 w-80'>
    <CardHeader>
      <CardTitle>Threshold Workout</CardTitle>
      <CardDescription>Tuesday, August 22</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="flex flex-col -mt-2">
        <div className='flex gap-2 items-center'>
          <div className='w-2 h-2 bg-pink-300 rounded-full' />
          <h3 className='font-semibold'>Warmup</h3>
        </div>
        <p className='text-sm'>10 minutes &rarr; 8:44 / mi</p>
      </div>
      <div className='flex flex-col mt-4 border p-4 -m-2 rounded'>
        <h2 className='font-bold mb-1'>Repeat x3</h2>
        <div className="flex flex-col">
          <div className='flex gap-2 items-center'>
            <div className='w-2 h-2 bg-pink-500 rounded-full' />
            <h3 className='font-semibold'>Interval</h3>
          </div>
          <p className='text-sm'>1200m &rarr; 4:48 each</p>
        </div>
        <div className="flex flex-col">
          <div className='flex gap-2 items-center'>
            <div className='w-2 h-2 bg-pink-300 rounded-full' />
            <h3 className='font-semibold'>Recovery</h3>
          </div>
          <p className='text-sm'>400m</p>
        </div>
      </div>
      <div className="flex flex-col mt-4">
        <div className='flex gap-2 items-center'>
          <div className='w-2 h-2 bg-pink-300 rounded-full' />
          <h3 className='font-semibold'>Cooldown</h3>
        </div>
        <p className='text-sm'>10 minutes &rarr; 8:44 / mi</p>
      </div>
    </CardContent>
  </Card>
}

function SampleConversation() {
  return <Card className='relative dark bg-neutral-900 dark:bg-white w-80 z-10'>
    <CardHeader>
      <CardTitle className='text-xl flex gap-4 items-center text-white'>
        Coach Anthony
      </CardTitle>
      <div className='flex gap-2 items-center'>
        <div className="w-2 h-2 bg-pink-500 rounded-full" />
        <p className='text-sm text-neutral-400 font-normal'>Online Now</p>
      </div>
    </CardHeader>
    <CardContent className='flex flex-col gap-4'>
      <div className='text-sm flex gap-4 items-center justify-between'>
        <Avatar>
          <AvatarImage src='/images/oriana.jpg' />
          <AvatarFallback>CA</AvatarFallback>
        </Avatar>
        <p className='bg-neutral-800 p-2 text-neutral-200 leading-tight'>I felt great on the workout! Did an extra rep for fun too</p>
      </div>
      <div className='text-sm flex gap-4 items-center justify-between'>
        <p className='bg-neutral-800 p-2 text-neutral-200 leading-tight'>That&apos;s great to hear! I see you hit the paces spot on too nice job</p>
        <Avatar>
          <AvatarImage src='/images/anthony.jpg' />
          <AvatarFallback>CA</AvatarFallback>
        </Avatar>
      </div>
      <div className='text-sm flex gap-4 items-center justify-between'>
        <Avatar>
          <AvatarImage src='/images/oriana.jpg' />
          <AvatarFallback>CA</AvatarFallback>
        </Avatar>
        <p className='bg-neutral-800 p-2 text-neutral-200 leading-tight'>Thanks! Kinda of busy tomorrow think I&apos;ll take the day off</p>
      </div>
      <div className='text-sm flex gap-4 items-center justify-between'>
        <p className='bg-neutral-800 p-2 text-neutral-200 leading-tight'>Sure thing, take it easy and recovery well 💪</p>
        <Avatar>
          <AvatarImage src='/images/anthony.jpg' />
          <AvatarFallback>CA</AvatarFallback>
        </Avatar>
      </div>
    </CardContent>
  </Card>
}

export default function Home() {
  return (
    <DefaultLayout>
      <section className="grid grid-cols-1 lg:grid-cols-2 max-w-8xl w-5/6 h-tall mx-auto">
        <div className="flex flex-col items-center justify-center h-full">
          <h2 className="cursor-default relative text-5xl md:text-6xl lg:text-8xl font-black text-center uppercase my-8">COACHING <br /> DESIGNED <br /> FOR <span
            className="text-transparent bg-clip-text bg-gradient-to-tr from-pink-600 to-pink-500 border-b-8 border-b-neutral-900">YOU</span>
            <Strokes />
          </h2>
        </div>
        <div className="flex flex-col items-center justify-center h-full">
          <div className='relative'>
            <SampleConversation />
            <SampleWeek />
            <SampleTraining />
          </div>
        </div>
      </section>
    </DefaultLayout>
  )
}
