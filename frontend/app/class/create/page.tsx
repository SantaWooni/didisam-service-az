import Link from "next/link"
import { Calendar, ListChecks, RefreshCw, ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const CLASS_TYPES = [
  {
    href: "/class/create/period",
    icon: Calendar,
    label: "기간 클래스",
    description: "특정 기간 동안 진행되는 클래스",
    badge: "기간제",
    accent:
      "from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 dark:from-blue-950/40 dark:to-indigo-950/40",
    iconColor: "text-blue-600 dark:text-blue-400",
    iconBg: "bg-blue-100 dark:bg-blue-900/50",
  },
  {
    href: "/class/create/session",
    icon: ListChecks,
    label: "회차 클래스",
    description: "정해진 횟수로 진행되는 클래스",
    badge: "회차제",
    accent:
      "from-violet-50 to-purple-50 hover:from-violet-100 hover:to-purple-100 dark:from-violet-950/40 dark:to-purple-950/40",
    iconColor: "text-violet-600 dark:text-violet-400",
    iconBg: "bg-violet-100 dark:bg-violet-900/50",
  },
  {
    href: "/class/create/subscription",
    icon: RefreshCw,
    label: "구독 클래스",
    description: "월정액 구독 방식의 클래스",
    badge: "구독제",
    accent:
      "from-emerald-50 to-teal-50 hover:from-emerald-100 hover:to-teal-100 dark:from-emerald-950/40 dark:to-teal-950/40",
    iconColor: "text-emerald-600 dark:text-emerald-400",
    iconBg: "bg-emerald-100 dark:bg-emerald-900/50",
  },
]

export default function ClassCreatePage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        {/* Header */}
        <div className="mb-12 text-center">
          <Badge variant="secondary" className="mb-4 px-3 py-1 text-xs font-medium">
            클래스 개설
          </Badge>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            어떤 클래스를 만드실건가요?
          </h1>
          <p className="mt-3 text-base text-muted-foreground">
            운영 방식에 맞는 클래스 유형을 선택하세요
          </p>
        </div>

        {/* Class type cards */}
        <div className="flex flex-col gap-4">
          {CLASS_TYPES.map(({ href, icon: Icon, label, description, badge, accent, iconColor, iconBg }) => (
            <Link key={href} href={href} className="group block focus-visible:outline-none">
              <Card
                className={`cursor-pointer bg-gradient-to-r transition-all duration-200 ${accent} ring-1 ring-foreground/10 group-focus-visible:ring-2 group-focus-visible:ring-ring`}
              >
                <CardContent className="flex items-center gap-5 py-6">
                  {/* Icon */}
                  <div
                    className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl ${iconBg}`}
                  >
                    <Icon className={`h-7 w-7 ${iconColor}`} strokeWidth={1.75} />
                  </div>

                  {/* Text */}
                  <div className="flex flex-1 flex-col gap-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-base font-semibold text-foreground">{label}</span>
                      <Badge variant="secondary" className="text-xs">
                        {badge}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{description}</p>
                  </div>

                  {/* Arrow */}
                  <ArrowRight
                    className="h-5 w-5 shrink-0 text-muted-foreground/40 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-muted-foreground"
                    strokeWidth={2}
                  />
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Footer hint */}
        <p className="mt-8 text-center text-xs text-muted-foreground">
          클래스 유형은 개설 후 변경할 수 없습니다. 신중하게 선택해주세요.
        </p>
      </div>
    </div>
  )
}
