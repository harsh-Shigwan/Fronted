import React from 'react'
import Breadcrumb from '../../components/Breadcrumb';

const Staff_Mangement = () => {
  return (
    <div>
    <Breadcrumb></Breadcrumb>
    <div className="py-8 ml-[30px] ">
      <div className="flex gap-5 max-md:flex-col max-md:gap-0 max-md:">
        <div className="flex flex-col w-3/12 max-md:ml-0 max-md:w-full">
          <div className="flex flex-col grow justify-center px-6 py-12 mx-auto w-full whitespace-nowrap bg-white rounded-2xl shadow-md max-md:px-5 max-md:mt-10">
            <div className="flex gap-4 justify-between mt-2.5">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/4eec1eef119770d1bb83c740224e9595e99318c267dada1fb87f9ee35dca0531?apiKey=8cd55a55d3fd4759ad0a38ee8bf55a48&"
                className="aspect-square w-[46px]"
              />
              <div className="flex flex-col flex-1 self-start">
                <div className="text-base font-bold text-slate-500">
                  Total Employee
                </div>
                <div className="text-xl font-semibold leading-7 text-gray-900">
                  150
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col ml-5 w-3/12 max-md:ml-0 max-md:w-full">
          <div className="flex flex-col grow justify-center px-6 py-12 mx-auto w-full whitespace-nowrap bg-white rounded-2xl shadow-md max-md:px-5 max-md:mt-10">
            <div className="flex gap-4 justify-between mt-2.5">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/edd7a949f48c5fb2a4cd943076d4b03530d4c8bb300558d84f7461e3fc61d4b2?apiKey=8cd55a55d3fd4759ad0a38ee8bf55a48&"
                className="aspect-square w-[46px]"
              />
              <div className="flex flex-col flex-1 self-start">
                <div className="text-base font-bold text-slate-500">
                  Today’s Atendance
                </div>
                <div className="text-xl font-semibold leading-7 text-gray-900">
                  120
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col ml-5 w-3/12 max-md:ml-0 max-md:w-full">
          <div className="flex flex-col grow justify-center px-6 py-12 mx-auto w-full whitespace-nowrap bg-white rounded-2xl shadow-md max-md:px-5 max-md:mt-10">
            <div className="flex gap-4 justify-between mt-2.5">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/2219aebc15fb6b3891b2ff160ae960e350b2558743e385641c519f9da78b5b18?apiKey=8cd55a55d3fd4759ad0a38ee8bf55a48&"
                className="aspect-square w-[46px]"
              />
              <div className="flex flex-col flex-1 self-start">
                <div className="text-base font-bold text-slate-500">
                  Past Attendance
                </div>
                <div className="text-xl font-semibold leading-7 text-gray-900">
                  100
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col ml-5 w-3/12 max-md:ml-0 max-md:w-full">
          <div className="flex flex-col grow justify-center px-6 py-12 mx-auto w-full whitespace-nowrap bg-white rounded-2xl shadow-md max-md:px-5 max-md:mt-10">
            <div className="flex gap-4 justify-between mt-2.5">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/eb6ceb63ca4140ddaa0eac7a6ab629631e4c42eefcc34269d0568cb637f165b1?apiKey=8cd55a55d3fd4759ad0a38ee8bf55a48&"
                className="aspect-square w-[46px]"
              />
              <div className="flex flex-col flex-1 self-start">
                <div className="text-base font-bold text-slate-500">
                  Average Atendance
                </div>
                <div className="text-xl font-semibold leading-7 text-gray-900">
                  100
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="flex flex-col justify-end px-6 pt-9 pb-3 bg-white rounded-2xl shadow-md max-md:px-5">
      <div className="flex gap-5 justify-between self-start">
        <div className="flex flex-col flex-1">
          <div className="text-lg font-semibold leading-6 text-gray-900">
            Attendace Graph
          </div>
          <div className="flex gap-5 justify-between mt-7 text-xs font-medium leading-3 text-slate-600">
            <div className="flex gap-2.5 justify-between whitespace-nowrap">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/e94bf7f2d63286499c1c6e947f5d544ff808a40ce37cf73a4a07816b9e38826f?apiKey=8cd55a55d3fd4759ad0a38ee8bf55a48&"
                className="my-auto w-2 aspect-square"
              />
              <div>Doctor</div>
            </div>
            <div className="flex gap-2.5 justify-between">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/636e1b21ee7a443165b5af8d37ceb2904164d38cda0e921b03070fde4bf0e07a?apiKey=8cd55a55d3fd4759ad0a38ee8bf55a48&"
                className="my-auto w-2 aspect-square"
              />
              <div>Hospital Staff</div>
            </div>
          </div>
        </div>
        <div className="flex gap-2.5 self-end mt-11 text-xs font-medium leading-3 text-slate-600 max-md:mt-10">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/7449901862386fb502cc4c3ee8658e1dd046d357d470373ac24c7933bef3629b?apiKey=8cd55a55d3fd4759ad0a38ee8bf55a48&"
            className="my-auto w-2 aspect-square"
          />
          <div>Other staff</div>
        </div>
      </div>
      <div className="flex gap-5 justify-between mt-8 max-md:flex-wrap max-md:max-w-full">
        <div className="flex flex-col justify-between self-start text-xs font-semibold tracking-normal leading-3 whitespace-nowrap basis-0 text-slate-600 max-md:hidden">
          <div>20</div>
          <div className="mt-16 max-md:mt-10">15</div>
          <div className="mt-16 max-md:mt-10">10</div>
          <div className="mt-16 max-md:mt-10">5</div>
          <div className="mt-16 max-md:mt-10">0</div>
        </div>
        <div className="flex flex-col flex-1 justify-center max-md:max-w-full">
          <div className="flex gap-5 justify-between max-md:flex-wrap max-md:max-w-full">
            <div className="flex flex-col flex-1 justify-end">
              <div className="flex gap-1.5 justify-center px-px">
                <div className="flex flex-col justify-center basis-0">
                  <div className="flex flex-col pt-12 bg-white rounded-[50px]">
                    <div className="shrink-0 mt-28 bg-indigo-400 w-[10px] h-[163px] rounded-[50px] max-md:mt-10" />
                  </div>
                </div>
                <div className="flex flex-col justify-center basis-0">
                  <div className="shrink-0 bg-rose-300 w-[10px] h-[326px] rounded-[50px]" />
                </div>
                <div className="flex flex-col justify-center basis-0">
                  <div className="flex flex-col pt-12 bg-white rounded-[50px]">
                    <div className="shrink-0 mt-48 w-[10px] bg-[linear-gradient(225deg,#FFEF5E_0%,#F7936F_100%)] h-[81px] rounded-[50px] max-md:mt-10" />
                  </div>
                </div>
              </div>
              <div className="mt-3 text-xs font-semibold tracking-normal leading-3 text-center text-slate-500">
                2/1/24
              </div>
            </div>
            <div className="flex flex-col flex-1 justify-end">
              <div className="flex gap-1.5 justify-center px-px">
                <div className="flex flex-col justify-center basis-0">
                  <div className="flex flex-col pt-12 bg-white rounded-[50px]">
                    <div className="shrink-0 mt-28 bg-indigo-400 w-[10px] h-[163px] rounded-[50px] max-md:mt-10" />
                  </div>
                </div>
                <div className="flex flex-col justify-center basis-0">
                  <div className="flex flex-col pt-12 bg-white rounded-[50px]">
                    <div className="shrink-0 mt-48 bg-rose-300 w-[10px] h-[81px] rounded-[50px] max-md:mt-10" />
                  </div>
                </div>
                <div className="flex flex-col justify-center basis-0">
                  <div className="flex flex-col pt-12 bg-white rounded-[50px]">
                    <div className="shrink-0 mt-28 bg-[linear-gradient(225deg,#FFEF5E_0%,#F7936F_100%)] w-[10px] h-[163px] rounded-[50px] max-md:mt-10" />
                  </div>
                </div>
              </div>
              <div className="mt-3 text-xs font-semibold tracking-normal leading-3 text-center text-slate-500">
                3/1/24
              </div>
            </div>
            <div className="flex flex-col flex-1 justify-end">
              <div className="flex gap-1.5 justify-center px-px">
                <div className="flex flex-col justify-center basis-0">
                  <div className="flex flex-col pt-12 bg-white rounded-[50px]">
                    <div className="shrink-0 mt-48 bg-indigo-400 w-[10px] h-[81px] rounded-[50px] max-md:mt-10" />
                  </div>
                </div>
                <div className="flex flex-col justify-center basis-0">
                  <div className="flex flex-col pt-12 bg-white rounded-[50px]">
                    <div className="shrink-0 mt-8 bg-rose-300 w-[10px] h-[244px] rounded-[50px]" />
                  </div>
                </div>
                <div className="flex flex-col justify-center basis-0">
                  <div className="flex flex-col pt-12 bg-white rounded-[50px]">
                    <div className="shrink-0 mt-48 bg-[linear-gradient(225deg,#FFEF5E_0%,#F7936F_100%)] w-[10px] h-[81px] rounded-[50px] max-md:mt-10" />
                  </div>
                </div>
              </div>
              <div className="mt-3 text-xs font-semibold tracking-normal leading-3 text-center text-slate-500">
                4/1/24
              </div>
            </div>
            <div className="flex flex-col flex-1 justify-end">
              <div className="flex gap-1.5 justify-center px-px">
                <div className="flex flex-col justify-center basis-0">
                  <div className="flex flex-col pt-12 bg-white rounded-[50px]">
                    <div className="shrink-0 mt-28 bg-indigo-400 w-[10px] h-[163px] rounded-[50px] max-md:mt-10" />
                  </div>
                </div>
                <div className="flex flex-col justify-center basis-0">
                  <div className="flex flex-col pt-12 bg-white rounded-[50px]">
                    <div className="shrink-0 mt-48 bg-rose-300 w-[10px] h-[81px] rounded-[50px] max-md:mt-10" />
                  </div>
                </div>
                <div className="flex flex-col justify-center basis-0">
                  <div className="flex flex-col pt-12 bg-white rounded-[50px]">
                    <div className="shrink-0 mt-48 bg-[linear-gradient(225deg,#FFEF5E_0%,#F7936F_100%)] w-[10px] h-[81px] rounded-[50px] max-md:mt-10" />
                  </div>
                </div>
              </div>
              <div className="mt-3 text-xs font-semibold tracking-normal leading-3 text-center text-slate-500">
                5/1/24
              </div>
            </div>
            <div className="flex flex-col flex-1 justify-end">
              <div className="flex gap-1.5 justify-center px-px">
                <div className="flex flex-col justify-center basis-0">
                  <div className="flex flex-col pt-12 bg-white rounded-[50px]">
                    <div className="shrink-0 mt-28 bg-indigo-400 w-[10px] h-[163px] rounded-[50px] max-md:mt-10" />
                  </div>
                </div>
                <div className="flex flex-col justify-center basis-0">
                  <div className="flex flex-col pt-12 bg-white rounded-[50px]">
                    <div className="shrink-0 mt-8 bg-rose-300 w-[10px] h-[244px] rounded-[50px]" />
                  </div>
                </div>
                <div className="flex flex-col justify-center basis-0">
                  <div className="flex flex-col pt-12 bg-white rounded-[50px]">
                    <div className="shrink-0 mt-48 bg-[linear-gradient(225deg,#FFEF5E_0%,#F7936F_100%)] w-[10px] h-[81px] rounded-[50px] max-md:mt-10" />
                  </div>
                </div>
              </div>
              <div className="mt-3 text-xs font-semibold tracking-normal leading-3 text-center text-slate-500">
                6/1/24
              </div>
            </div>
            <div className="flex flex-col flex-1 justify-end">
              <div className="flex gap-1.5 justify-center px-px">
                <div className="flex flex-col justify-center basis-0">
                  <div className="flex flex-col pt-12 bg-white rounded-[50px]">
                    <div className="shrink-0 mt-28 bg-indigo-400 w-[10px] h-[163px] rounded-[50px] max-md:mt-10" />
                  </div>
                </div>
                <div className="flex flex-col justify-center basis-0">
                  <div className="shrink-0 bg-rose-300 w-[10px] h-[326px] rounded-[50px]" />
                </div>
                <div className="flex flex-col justify-center basis-0">
                  <div className="flex flex-col pt-12 bg-white rounded-[50px]">
                    <div className="shrink-0 mt-48 bg-[linear-gradient(225deg,#FFEF5E_0%,#F7936F_100%)] w-[10px] h-[81px] rounded-[50px] max-md:mt-10" />
                  </div>
                </div>
              </div>
              <div className="mt-3 text-xs font-semibold tracking-normal leading-3 text-center text-slate-500">
                7/1/24
              </div>
            </div>
            <div className="flex flex-col flex-1 justify-end">
              <div className="flex gap-1.5 justify-center px-px">
                <div className="flex flex-col justify-center basis-0">
                  <div className="flex flex-col pt-12 bg-white rounded-[50px]">
                    <div className="shrink-0 mt-8 bg-indigo-400 w-[10px] h-[244px] rounded-[50px]" />
                  </div>
                </div>
                <div className="flex flex-col justify-center basis-0">
                  <div className="flex flex-col pt-12 bg-white rounded-[50px]">
                    <div className="shrink-0 mt-28 bg-rose-300 w-[10px] h-[163px] rounded-[50px] max-md:mt-10" />
                  </div>
                </div>
                <div className="flex flex-col justify-center basis-0">
                  <div className="flex flex-col pt-12 bg-white rounded-[50px]">
                    <div className="shrink-0 mt-48 bg-[linear-gradient(225deg,#FFEF5E_0%,#F7936F_100%)] w-[10px] h-[81px] rounded-[50px] max-md:mt-10" />
                  </div>
                </div>
              </div>
              <div className="mt-3 text-xs font-semibold tracking-normal leading-3 text-center text-slate-500">
                8/1/24
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div className="flex flex-col mt-[40px] py-11 pr-20 pl-8 bg-white rounded-xl shadow-md max-md:px-5">
      <div className="text-xl font-semibold text-black max-md:mr-2 max-md:max-w-full">
        Current Week's Schedule Summary
      </div>{" "}
      <div className="self-center mt-9 w-full max-w-[908px] max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0 max-md:">
          <div className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow justify-end items-center px-5 py-6 w-full font-bold whitespace-nowrap bg-white rounded-2xl shadow-md max-md:px-5 max-md:mt-10">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/c74d640960b9385773c48ad97e028308c1f3d6040f22450d28988a96fd4cd9cd?apiKey=8cd55a55d3fd4759ad0a38ee8bf55a48&"
                className="aspect-[1.1] w-[82px]"
              />{" "}
              <div className="self-stretch mt-8 text-base text-slate-500">
                Number of Shifts Scheduled{" "}
              </div>{" "}
              <div className="mt-5 text-xl text-black">10</div>
            </div>
          </div>{" "}
          <div className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow justify-end items-center px-12 py-6 w-full bg-white rounded-2xl shadow-md max-md:px-5 max-md:mt-10">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/6bd1766b71f71b171578edfcb81d622de89732b11247c8e67647f1e652f91273?apiKey=8cd55a55d3fd4759ad0a38ee8bf55a48&"
                className="aspect-square w-[75px]"
              />{" "}
              <div className="self-stretch mt-4 text-base font-semibold text-slate-500">
                Number of Employees
                <br /> Scheduled
              </div>{" "}
              <div className="mt-5 text-xl font-bold text-black">10</div>
            </div>
          </div>{" "}
          <div className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow items-center px-20 py-7 w-full whitespace-nowrap bg-white rounded-2xl shadow-md max-md:px-5 max-md:mt-10">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/258b48c9c6bbcb8617717fae3ade30768471d8c7f891ede9fb462be3153fc47d?apiKey=8cd55a55d3fd4759ad0a38ee8bf55a48&"
                className="aspect-[1.12] fill-sky-500 fill-opacity-50 w-[84px]"
              />{" "}
              <div className="mt-5 text-base font-semibold text-slate-500">
                Open Shifts
              </div>{" "}
              <div className="mt-7 text-xl font-bold text-black">30</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="flex flex-col mt-[40px] py-9 pr-20 pl-10 font-semibold bg-white rounded-xl shadow-md max-md:px-5">
      <div className="self-start text-xl text-black max-md:max-w-full">
        Next Week Schedule
      </div>
      <div className="flex flex-col self-center px-14 py-12 mt-6 max-w-full text-lg whitespace-nowrap rounded-full bg-indigo-100 bg-opacity-50 text-blue-500 text-opacity-80 w-[301px] max-md:px-5">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/7d8bef644fa0e1390aae61c8079aa95f5a93a914f2ac433d6dc20714a9b959e4?apiKey=8cd55a55d3fd4759ad0a38ee8bf55a48&"
          className="self-center max-w-full aspect-square w-[158px]"
        />
        <div className="mt-1 mb-4">Nothing to show here</div>
      </div>
    </div>
</div>
  )
}

export default Staff_Mangement;
