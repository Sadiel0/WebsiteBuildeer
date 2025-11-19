import prisma from '@/lib/prisma'

export async function getUserId() {
    // Check if a demo user exists, if not create one
    let demoUser = await prisma.user.findFirst({
        where: { email: 'demo@example.com' }
    })

    if (!demoUser) {
        demoUser = await prisma.user.create({
            data: {
                email: 'demo@example.com',
                password: 'demo', // Dummy password
            }
        })
    }

    return demoUser.id
}
