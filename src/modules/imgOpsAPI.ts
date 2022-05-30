const loadImgFromPath = async (path: string): Promise<Blob> => {
    try {
        const response = await fetch(path)

        const data = await response.blob()

        return data
    }
    catch (error) {
        alert(`Load image error: ${error.message}`)
        throw error
    }
}

export const makeProcessImgRequest = async (path: string, imgFilePaths: string[]): Promise<string> => {
    try {
        const formData = new FormData()

        const imgFiles = await Promise.all(imgFilePaths.map(imgFilePath => loadImgFromPath(imgFilePath)))

        if (imgFiles.length === 1) {
            formData.append("img", imgFiles[0])
        } else {
            imgFiles.forEach((imgFile, index) => {
                formData.append(`img${index + 1}`, imgFile)
            })
        }

        const res = await fetch(`http://localhost:9090/process-img/${path}`, {
            method: "POST",
            body: formData,
        })

        const fullResponse = await res.blob()

        if (res.status !== 200) {
            const responseText = await fullResponse.text()

            alert(`API Request error: ${responseText}`)

            return imgFilePaths[0]
        }

        return URL.createObjectURL(fullResponse)
    } catch (error) {
        alert(`API Request error: ${error.message}`)
        throw error
    }
}