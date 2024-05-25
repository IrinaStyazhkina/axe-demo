import freemarker.template.TemplateMethodModelEx;

import java.util.List;

public class IncrementIndexMethod implements TemplateMethodModelEx {
    private int globalCounter = 0;

    @Override
    public Object exec(List arguments) {
        return ++globalCounter;
    }
}